import { afterEach, describe, expect, it, mock } from "bun:test";
import { fetchProgram, fetchPrograms } from "../src/api";

const originalFetch = globalThis.fetch;
const originalTimeout = AbortSignal.timeout;

function replaceTimeout(replacement: typeof AbortSignal.timeout): void {
  Object.defineProperty(AbortSignal, "timeout", {
    configurable: true,
    value: replacement,
  });
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  replaceTimeout(originalTimeout);
});

describe("openaffiliate.dev request bounds", () => {
  for (const [input, expected] of [
    ["top", "commission_desc"], ["trending", "newest"], ["new", "newest"],
    ["relevance", "relevance"], ["az", "az"], ["za", "za"],
    ["commission_desc", "commission_desc"], ["newest", "newest"],
  ] as const) {
    it(`sends canonical sort ${expected} for ${input}`, async () => {
      let requested: URL | undefined;
      globalThis.fetch = mock(async (url: string | URL | Request) => {
        requested = new URL(String(url));
        return Response.json({ programs: [], total: 0 });
      }) as typeof fetch;
      await fetchPrograms({ sort: input });
      expect(requested?.searchParams.get("sort")).toBe(expected);
    });
  }

  it("uses a 10-second timeout for list and detail requests", async () => {
    const signal = new AbortController().signal;
    const timeout = mock(() => signal);
    replaceTimeout(timeout as typeof AbortSignal.timeout);
    const requests: RequestInit[] = [];

    globalThis.fetch = mock(async (input: string | URL | Request, init?: RequestInit) => {
      requests.push(init ?? {});
      const isDetail = String(input).endsWith("/demo");
      return Response.json(
        isDetail
          ? { slug: "demo", name: "Demo" }
          : { programs: [], total: 0 },
      );
    }) as typeof fetch;

    await fetchPrograms({});
    await fetchProgram("demo");

    expect(timeout).toHaveBeenCalledTimes(2);
    expect(timeout).toHaveBeenNthCalledWith(1, 10_000);
    expect(timeout).toHaveBeenNthCalledWith(2, 10_000);
    expect(requests.every((request) => request.signal === signal)).toBe(true);
  });

  it("cancels and rejects a response larger than 5 MB", async () => {
    let cancelled = false;
    let sentChunks = 0;
    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (sentChunks === 0) controller.enqueue(new TextEncoder().encode("{"));
        else if (sentChunks <= 5) {
          controller.enqueue(new Uint8Array(1024 * 1024).fill(0x20));
        }
        else {
          controller.enqueue(new TextEncoder().encode("}"));
          controller.close();
        }
        sentChunks += 1;
      },
      cancel() {
        cancelled = true;
      },
    });
    globalThis.fetch = mock(async () => new Response(stream)) as typeof fetch;

    await expect(fetchPrograms({})).rejects.toThrow("API response exceeds 5 MB");
    expect(cancelled).toBe(true);
  });

  it("preserves the normalized response for a normal body", async () => {
    globalThis.fetch = mock(async () =>
      Response.json({
        programs: [
          {
            slug: "demo",
            name: "Demo",
            commission: { type: "recurring", rate: "20%" },
            cookieDays: 30,
            stars: 7,
          },
        ],
        total: 1,
      }),
    ) as typeof fetch;

    const result = await fetchPrograms({});

    expect(result).toEqual({
      count: 1,
      data: [
        expect.objectContaining({
          id: "demo",
          slug: "demo",
          name: "Demo",
          reward_type: "recurring",
          reward_value: "20%",
          cookie_days: 30,
          stars_count: 7,
        }),
      ],
    });
  });
});
