> **DEPRECATED**: This file previously documented the list.affitor.com API, which has been retired.
> The data source is now **openaffiliate.dev**. All references below have been updated accordingly.

# openaffiliate.dev Data Access

## Overview

openaffiliate.dev is a public, open API — no API key, no authentication, no rate limits, no free-tier restrictions.

Base URL: `https://openaffiliate.dev/api`

## Method 1: API (preferred)

### GET /api/programs

Lists affiliate programs. Supports search and filtering via query params.

Query params:
```
q=search_term     Search name + description
sort=relevance    Sort: relevance (default) | other supported sort values
limit=30          Results per page
```

Example request:
```
GET https://openaffiliate.dev/api/programs?q=ai+video&sort=relevance&limit=10
```

Response format:
```json
{
  "programs": [
    {
      "slug": "heygen",
      "name": "HeyGen",
      "url": "https://heygen.com",
      "logo": "https://...",
      "category": "ai",
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
        "methods": ["paypal"]
      },
      "description": "AI video generation platform...",
      "shortDescription": "Create AI videos at scale",
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

The response key is `programs` (array). The raw API uses **camelCase** fields.

### GET /api/programs/:slug

Returns a single program by its slug. No auth required.

Example:
```
GET https://openaffiliate.dev/api/programs/heygen
```

Returns the program object directly (same shape as a single item in `programs[]` above).

## Raw API field reference

| Raw API field | Notes |
|---|---|
| `slug` | URL-safe identifier (replaces old UUID-based id) |
| `name` | Program display name |
| `url` | Product website |
| `logo` | Logo image URL |
| `category` | Category string |
| `commission.type` | Commission type (cps_recurring, cps_one_time, cpl, etc.) |
| `commission.rate` | Commission rate (e.g., "30%") |
| `commission.currency` | Currency code |
| `commission.duration` | Duration (e.g., "12 months", "lifetime") |
| `cookieDays` | Cookie window in days |
| `payout.minimum` | Minimum payout threshold |
| `payout.frequency` | Payment frequency |
| `stars` | Community star count |
| `verified` | Whether the program is verified |

## Normalized skill-facing fields

The CLI adapter (`tools/src/api.ts`) maps the raw camelCase fields above to the
normalized snake_case model used by skills:

| Skill field | Source |
|---|---|
| `reward_value` | `commission.rate` |
| `reward_type` | `commission.type` |
| `cookie_days` | `cookieDays` |
| `stars_count` | `stars` |
| `reward_duration` | `commission.duration` |

Skills always consume normalized fields. Only update raw-API examples when the API contract changes.

## Method 2: Web Fetch (fallback)

Use this if the API returns errors or you want to browse programs.

1. `web_search`: `site:openaffiliate.dev [user's category/keyword]`
2. `web_fetch`: the relevant openaffiliate.dev URL
3. Parse the page content to extract program data:
   - Program name
   - Commission rate and type (look for patterns like "30% recurring")
   - Cookie days
   - Stars count
   - Description text

Program pages: `openaffiliate.dev/programs/[slug]`

## Caching

- Cache results within a conversation — do not re-fetch for the same query
- Prefer the API (structured data, fewer tokens consumed)
