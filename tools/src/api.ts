/**
 * openaffiliate.dev API client
 *
 * Public, open API — no key required, no rate tier. This client adapts the
 * openaffiliate.dev response shape (camelCase, nested `commission`, `programs[]`)
 * to the normalized snake_case `Program` shape the rest of affiliate-check uses,
 * so formatting and skills keep working unchanged.
 *
 * openaffiliate.dev only supports `q`, `sort`, `limit`, `category` server-side;
 * `reward_type`, `tags`, and `min_cookie_days` are applied client-side here.
 */

const API_BASE = "https://openaffiliate.dev/api";

export interface Program {
  id: string;
  slug: string;
  name: string;
  url: string | null;
  description: string;
  reward_type: string | null;
  reward_value: string | null;
  cookie_days: number | null;
  stars_count: number;
  views_count: number;
  comments_count: number;
  category: string | null;
  tags: string[] | null;
  type: string;
  stage: string | null;
  status: string;
  created_at: string;
  verified?: boolean;
  profiles: {
    handle: string | null;
    avatar_url: string | null;
    name: string | null;
  };
}

export interface ProgramsResponse {
  data: Program[];
  count: number;
}

export interface SearchParams {
  q?: string;
  type?: "affiliate_program" | "skill";
  sort?: "trending" | "new" | "top";
  limit?: number;
  offset?: number;
  reward_type?: string;
  tags?: string;
  min_cookie_days?: number;
}

/** Raw openaffiliate.dev program shape (only the fields we map). */
interface OAProgram {
  slug: string;
  name: string;
  url?: string | null;
  category?: string | null;
  commission?: {
    type?: string;
    rate?: string;
  };
  cookieDays?: number | null;
  tags?: string[] | null;
  stars?: number;
  verified?: boolean;
  description?: string;
  shortDescription?: string;
  createdAt?: string;
}

// affiliate-check's reward_type vocabulary → openaffiliate commission.type words.
const REWARD_TYPE_ALIASES: Record<string, string> = {
  cps_recurring: "recurring",
  cps_one_time: "one-time",
  cps_lifetime: "lifetime",
  cpl: "lead",
  cpc: "click",
};

function adapt(p: OAProgram): Program {
  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    url: p.url ?? null,
    description: p.description ?? p.shortDescription ?? "",
    reward_type: p.commission?.type ?? null,
    reward_value: p.commission?.rate ?? null,
    cookie_days: p.cookieDays ?? null,
    stars_count: p.stars ?? 0,
    views_count: 0,
    comments_count: 0,
    category: p.category ?? null,
    tags: p.tags ?? null,
    type: "affiliate_program",
    stage: null,
    status: "published",
    created_at: p.createdAt ?? "",
    verified: p.verified,
    profiles: { handle: null, avatar_url: null, name: null },
  };
}

function applyClientFilters(programs: Program[], params: SearchParams): Program[] {
  let out = programs;

  if (params.reward_type) {
    const want = (REWARD_TYPE_ALIASES[params.reward_type] ?? params.reward_type).toLowerCase();
    out = out.filter((p) => (p.reward_type ?? "").toLowerCase().includes(want));
  }
  if (params.tags) {
    const wanted = params.tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
    out = out.filter((p) => {
      const have = (p.tags ?? []).map((t) => t.toLowerCase());
      return wanted.some((t) => have.includes(t));
    });
  }
  if (params.min_cookie_days) {
    out = out.filter((p) => (p.cookie_days ?? 0) >= params.min_cookie_days!);
  }
  return out;
}

export async function fetchPrograms(
  params: SearchParams,
  _apiKey?: string
): Promise<ProgramsResponse> {
  const hasClientFilter = !!(params.reward_type || params.tags || params.min_cookie_days);
  const limit = params.limit;

  const url = new URL(`${API_BASE}/programs`);
  if (params.q) url.searchParams.set("q", params.q);
  if (params.sort) url.searchParams.set("sort", params.sort);
  // When filtering client-side, pull a wider page so the filter has data to work on.
  const fetchLimit = hasClientFilter ? Math.max(limit ?? 10, 100) : limit;
  if (fetchLimit) url.searchParams.set("limit", String(fetchLimit));

  const headers: Record<string, string> = {
    Accept: "application/json",
    "User-Agent": "affiliate-check/1.0",
  };

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API error (${response.status}): ${body}`);
  }

  const json = (await response.json()) as { programs?: OAProgram[]; total?: number };
  let data = (json.programs ?? []).map(adapt);

  if (hasClientFilter) {
    data = applyClientFilters(data, params);
    if (limit) data = data.slice(0, limit);
    return { data, count: data.length };
  }

  return { data, count: json.total ?? data.length };
}

export async function fetchProgram(
  slug: string,
  _apiKey?: string
): Promise<Program | null> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "User-Agent": "affiliate-check/1.0",
  };

  const response = await fetch(`${API_BASE}/programs/${encodeURIComponent(slug)}`, { headers });
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`API error (${response.status})`);
  }

  const p = (await response.json()) as OAProgram;
  return adapt(p);
}
