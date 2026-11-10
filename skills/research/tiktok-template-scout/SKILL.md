---
name: tiktok-template-scout
description: >
  Find trending CapCut and TikTok video templates using real usage data before you edit or script
  anything. Use this skill when the user wants to know which CapCut templates are blowing up right
  now, check whether a template is still early or already saturated, see template usage history and
  growth curves, pick a template that fits their niche, find rising formats for product marketing
  videos, or says "what CapCut templates are trending", "which template should I use", "is this
  template still early", "show me rising video templates", "template ideas for my product video",
  "what formats are getting used the most this week", "find a viral template for my niche",
  "template trend research", "which edits are people using on TikTok", "hot CapCut templates".
license: MIT
version: "1.0.0"
tags: ["affiliate-marketing", "research", "trending", "capcut", "tiktok", "templates", "video"]
compatibility: "Claude Code, ChatGPT, Gemini CLI, Cursor, Windsurf, OpenClaw, any AI agent"
metadata:
  author: shineforever
  version: "1.0"
  stage: S1-Research
---

# TikTok Template Scout

Scout trending CapCut/TikTok templates from **real usage data** — most-used counts, realtime
movers, and multi-week usage history — then fit-check the best candidates against the user's
niche and hand back a shortlist with timing verdicts. Templates are the fastest format lever in
short video: the edit is already proven, so the only work is the niche twist.

This skill is standalone: it needs no other skill to run, and its shortlist output plugs
cleanly into any content or scripting workflow that follows.

## Stage

This skill belongs to Stage S1: Research

## When to Use

- Before scripting or editing a short video for a product promotion
- When the user asks what templates or edit formats are trending right now
- When deciding whether a specific template is still early enough to ride
- When comparing this week's template usage against the last few weeks
- When a niche (fitness, SaaS, e-commerce, local services) needs a video format shortlist

## Input Schema

```
{
  niche: string               # (required) e.g. "home fitness gear", "B2B SaaS"
  goal: string                # (optional, default: "product awareness") awareness | clicks | conversions
  window: string              # (optional, default: "7d") 24h | 7d | 30d usage window
  template_name: string       # (optional) check a specific template instead of scouting
}
```

## Workflow

1. **Pull the trend data.** Call the GoAnyAPI `capcut-most-used-history` endpoint for the
   requested window (credit cost: 1 credit per call — verify at the live catalog
   `https://api.goanyapi.com/api/v1/mcp/catalog`). Use `capcut-most-used-realtime` for the
   current movers and `capcut-most-used-times` for cumulative usage counts. REST:
   `https://api.goanyapi.com/api/v1/...` with a Bearer key, or connect the MCP server
   `https://mcp.goanyapi.com/mcp` (OAuth in browser, no key on disk).
2. **Compute momentum.** For each template, compare recent usage against the history series:
   rising = accelerating week-over-week, peaking = flat or decelerating at high volume,
   stale = declining. Prefer rising templates with lower absolute usage — that is "early".
3. **Fit-check against the niche.** Score each candidate 0-2 on: does the template's native
   content style match the niche, can the product be the "reveal" or payoff, is the template
   still early. Anything scoring below 4/6 is dropped with a one-line reason.
4. **Script the twist.** For the top 2-3 survivors, describe the beat structure the template
   imposes (setup, cut, punchline placement) and where the affiliate product enters.
5. **Report with dates.** Output the shortlist with usage numbers, the window they came from,
   and the pull date. Never round a real number up to "viral" without the count behind it.

## Output Schema

```
{
  as_of: "2026-11-10",          # date the data was pulled
  window: "7d",
  shortlist: [
    {
      template_name: string,
      usage_counts: { total: number, this_window: number, momentum: "rising" | "peaking" | "stale" },
      niche_fit_score: number,        # 0-6
      fit_reason: string,
      product_slot: string,           # where the product enters the beat
      beat_structure: string          # setup / cut / punchline the template imposes
    }
  ],
  skipped: [{ template_name: string, reason: string }],
  data_source: "goanyapi capcut-most-used-* endpoints",
  credits_spent: number
}
```

## Output Format

Human-readable output is a markdown table sorted by momentum then fit score, plus one short
paragraph per shortlisted template describing the twist. Include the `as_of` date and the
`credits_spent` line. If the user pasted a specific template name, output the single-template
timing verdict instead of a shortlist.

## Error Handling

- **No API key configured:** say exactly what is missing (`GOANYAPI_API_KEY` or the MCP OAuth
  step), and fall back to asking the user to paste what they can see in CapCut's template
  browser — the fit-check and twist steps still run, only the numbers are missing. Never
  invent usage numbers.
- **Empty result set:** state it, note that empty API results still consumed credits, and
  widen the window once (24h → 7d → 30d) before giving up.
- **Endpoint schema mismatch:** the API may add fields; parse defensively and re-check the
  live catalog before retrying. Do not retry a 4xx more than once.
- **Rate or credit exhaustion:** stop scouting, report which step failed and the remaining
  balance from the `activity-credits` endpoint if available.

## Examples

**Example 1 —** "What CapCut templates are trending for home fitness gear this week?"

Expected output: a 3-row shortlist table (template name, usage window counts, momentum,
fit score), each with one paragraph on where the product becomes the payoff, an `as_of`
date, and a skipped list with reasons.

**Example 2 —** "Is the 'POV: you found it' template still early?"

Expected output: a single-template verdict — total vs. this-window usage, a momentum call
(rising / peaking / stale) with the week-over-week numbers quoted, and a ride-or-skip
recommendation.

**Example 3 —** "Find me 2 rising template formats for a B2B SaaS promo video."

Expected output: two candidates max, each with beat structure and the exact second where
the screen-recording or dashboard shot replaces the template's native media, plus the
credits spent.

## Disclosure note

If the scouted template is used for affiliate content, the resulting video must carry the
creator's affiliate disclosure per the platform's rules and the brand's own policy. This
skill supplies research data only; disclosure handling belongs to the publishing step.
