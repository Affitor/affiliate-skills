# openaffiliate.dev API Reference

Public API for the Open Affiliate program directory.

- **Base URL:** `https://openaffiliate.dev/api`
- **Format:** JSON
- **Auth:** None — fully public, no API key required
- **Last updated:** 2026-06-13

---

## Authentication

None. The API is fully open — no account, no API key, no rate limits. All endpoints are accessible without any headers.

---

## Endpoints

### GET /programs

List and search published affiliate programs.

#### Query Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `q` | string | — | Full-text search on name and description |
| `sort` | string | `relevance` | Sort order: `relevance`, `trending`, `new`, or `top` |
| `limit` | integer | `30` | Results per page |

Example — search for AI tools sorted by top:

```
GET https://openaffiliate.dev/api/programs?q=AI&sort=top&limit=10
```

#### Response

```json
{
  "programs": [
    {
      "slug": "heygen",
      "name": "HeyGen",
      "url": "https://heygen.com",
      "logo": "https://...",
      "category": "ai-tools",
      "commission": {
        "type": "cps_recurring",
        "rate": "30%",
        "currency": "USD",
        "duration": "12 months",
        "conditions": ""
      },
      "cookieDays": 60,
      "payout": {
        "minimum": 50,
        "currency": "USD",
        "frequency": "monthly",
        "methods": ["PayPal"]
      },
      "description": "AI video generation platform. Create studio-quality videos from text.",
      "shortDescription": "AI video generation",
      "tags": ["ai", "video"],
      "stars": 42,
      "verified": true,
      "agentPrompt": ""
    }
  ],
  "total": 1,
  "filters": {}
}
```

#### Field Reference (raw API shape)

| Field | Type | Notes |
|---|---|---|
| `slug` | string | URL-friendly identifier, e.g. `heygen` |
| `name` | string | Display name |
| `url` | string \| null | Product website |
| `logo` | string \| null | Logo image URL |
| `category` | string \| null | Top-level category |
| `commission.type` | string \| null | Commission structure type |
| `commission.rate` | string \| null | Commission amount, e.g. `"30%"` or `"$50"` |
| `commission.currency` | string \| null | Currency code |
| `commission.duration` | string \| null | Duration for recurring commissions, e.g. `"12 months"` |
| `commission.conditions` | string \| null | Additional conditions text |
| `cookieDays` | integer \| null | Cookie window in days (camelCase) |
| `payout.minimum` | number \| null | Minimum payout threshold |
| `payout.currency` | string \| null | Payout currency |
| `payout.frequency` | string \| null | Payout frequency, e.g. `"monthly"` |
| `payout.methods` | string[] \| null | Payout methods, e.g. `["PayPal", "Bank transfer"]` |
| `description` | string \| null | Full program description |
| `shortDescription` | string \| null | One-line description |
| `tags` | string[] \| null | Tag array |
| `stars` | integer | Community star count (popularity signal) |
| `verified` | boolean | Whether the program is verified |
| `agentPrompt` | string \| null | Agent-facing prompt text |

> **Note:** The table above describes the raw API shape only. The CLI adapter normalizes
> raw API fields into the skill-facing fields that all skills must use: `reward_value`
> (from `commission.rate`), `reward_type` (from `commission.type`), `cookie_days` (from
> `cookieDays`), and `stars_count` (from `stars`).
>
> **Field names matter.** Skills must use `reward_value`, `reward_type`, `cookie_days`, and
> `stars_count`. Do not substitute `commission_rate`, `upvotes`, or `cookie_duration` — these
> are wrong field names and will break skill chaining.

---

### GET /programs/:slug

Retrieve a single program by slug. Returns the program object directly (no wrapper key).

```
GET https://openaffiliate.dev/api/programs/heygen
```

#### Response

Returns the program object directly:

```json
{
  "slug": "heygen",
  "name": "HeyGen",
  ...
}
```

Returns `404` if no program is found with the given slug.

---

## Error Responses

| HTTP Status | Meaning |
|---|---|
| `404 Not Found` | Program slug does not exist |

---

## Code Examples

### curl

**Search programs:**

```bash
curl "https://openaffiliate.dev/api/programs?q=AI+video&sort=top&limit=10"
```

**Get a single program by slug:**

```bash
curl "https://openaffiliate.dev/api/programs/heygen"
```

---

### JavaScript / fetch

**Search programs:**

```js
async function searchPrograms(query, options = {}) {
  const url = new URL("https://openaffiliate.dev/api/programs");

  if (query) url.searchParams.set("q", query);
  if (options.sort) url.searchParams.set("sort", options.sort);
  if (options.limit) url.searchParams.set("limit", String(options.limit));

  const res = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
  if (!res.ok) throw new Error(`API error: ${res.status}`);

  return res.json(); // { programs: Program[], total: number, filters: object }
}

// Usage
const result = await searchPrograms("AI video", { sort: "top", limit: 10 });

for (const program of result.programs) {
  console.log(`${program.name} — ${program.commission.rate} (${program.commission.type}), ${program.cookieDays}d cookie`);
}
```

**Get a single program by slug:**

```js
async function getProgram(slug) {
  const res = await fetch(`https://openaffiliate.dev/api/programs/${slug}`, {
    headers: { "Accept": "application/json" },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json(); // program object directly
}
```

---

## Fallback: Web Scraping

If the API is unavailable, program data can be found on openaffiliate.dev pages directly.

**Method:**

1. Search: `site:openaffiliate.dev [category or keyword]` using a web search tool
2. Fetch the relevant page with a web fetch tool
3. Parse the page content:
   - Program name from the card heading
   - Commission info: look for patterns like `"30% recurring"` or `"$50 one-time"`
   - Cookie duration: look for `"Xd"` or `"X day cookie"`
   - Stars: star icon followed by a number
   - Description: paragraph text below the program name

**Program detail page format:** `https://openaffiliate.dev/programs/[slug]`

Example: `https://openaffiliate.dev/programs/heygen`
