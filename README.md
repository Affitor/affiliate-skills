# affiliate-skills

**Turn any AI into your affiliate marketing team.**

50 AI-powered skills across 8 stages with a closed-loop flywheel. Research programs, scout trending content, write data-backed posts, generate infographics, build pages, deploy, track, optimize, scale — with any AI agent.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-50-brightgreen)](skills/)
[![Standard](https://img.shields.io/badge/standard-agentskills.io-purple)](https://agentskills.io)

Works with: **Claude Code** · **Pi** · **ChatGPT** · **Gemini CLI** · **Cursor** · **Windsurf** · **OpenClaw** · **any AI that reads text**

### Install

```bash
# Claude Code / Pi (recommended)
npx skills add Affitor/affiliate-skills

# Or clone manually
git clone https://github.com/Affitor/affiliate-skills.git ~/.claude/skills/affiliate-skills
cd ~/.claude/skills/affiliate-skills && ./setup

# OpenClaw / ClawHub
clawhub install affiliate-skills

# Cursor / Windsurf
npx skills add Affitor/affiliate-skills
```

### Try it now — no install needed

Paste this into any AI:

```
Search the Affitor affiliate directory for AI video tools.
Use this API: GET https://list.affitor.com/api/v1/programs?q=AI+video&sort=top&limit=5
Show me the results in a table with: Name, Commission, Cookie Duration, Stars.
Then recommend the best one and explain why.
```

### Without affiliate-skills

- You Google "best affiliate programs" and get SEO spam written to rank, not to help
- You write content from gut feeling with no idea what format actually performs
- You have no data on what's trending, what hooks work, or what gaps exist
- You spend 4 hours on a landing page that converts at 0.2%
- You pick programs by vibes instead of data

### With affiliate-skills

| Skill | Mode | What it does |
|-------|------|--------------|
| Program Search | Data analyst | Live program data from list.affitor.com — commissions, cookies, comparisons. |
| Trending Scout | Intelligence | Scan YouTube/TikTok/X/Reddit for top content by engagement. Find what's winning. |
| Research Brief | Journalist | Collect real sources, extract stats, generate unique angles backed by data. |
| Angle Ranker | Strategist | Score content angles by competition, engagement prediction, and platform fit. |
| Traffic Analyzer | Due diligence | Evaluate advertiser website health before you commit to promoting. |
| Content & Blog | Creator | 12 skills that write posts, articles, scripts, and infographics from research. |
| Landing & Distribution | Builder | Pages, bio links, email sequences, deployment — all automated. |
| Analytics & Automation | Optimizer | Track conversions, A/B test, repurpose, scale what works. |
| Compliance & Meta | Safety net | FTC audit, funnel planning, self-improvement. |

---

## How It Works — The Affiliate Flywheel

```
  S1 RESEARCH ──▶ S2 CONTENT ──▶ S3 BLOG & SEO ──▶ S4 OFFERS & LANDING
       ▲                                                    │
       │                                                    ▼
       │                                              S5 DISTRIBUTION
       │                                                    │
       └──────────── S6 ANALYTICS ◀─────────────────────────┘
                          │
                          ▼
                    S7 AUTOMATION → SCALE
                          │
                    S8 META (across all)
```

**Closed loop.** S6 Analytics feeds BACK to S1 Research. Every skill knows what comes next (`chain_metadata.suggested_next`) and what feeds it. Data flows forward through the funnel and back through analytics.

**Data-driven.** S1 skills don't just find programs — they scout what content is actually performing (views, likes, shares), analyze traffic, and rank angles by real engagement data. By the time you write, you already know what format, hook, and platform to use.

**Research-backed.** Content skills don't write from thin air. `content-research-brief` collects real source articles first. Your posts have real stats, real quotes, and current information.

---

## Demo: zero to first commission

```
You:  I want to promote AI video tools. What's trending?

AI:   [runs trending-content-scout]

      Scanned 47 videos across YouTube + TikTok.

      Top format: comparison (45% of top content, avg engagement: 35.2)
      Best hook: "I replaced my $5K video team with AI" (engagement: 42.3)
      Gap: nobody comparing HeyGen vs Synthesia on TikTok
      Benchmark: median 18K views, top 10% needs 85K+

You:  What's the best program to promote?

AI:   [runs affiliate-program-search + traffic-analyzer]

       Name         Commission        Cookie    Stars   Traffic Score
       ──────────────────────────────────────────────────────────────
       HeyGen       30% recurring     60 days   ★ 127   82/100
       Synthesia    25% one-time      30 days   ★ 84    76/100
       D-ID         20% recurring     45 days   ★ 52    61/100

      HeyGen wins: highest commission, recurring, longest cookie,
      strongest website traffic (2.1M monthly visits, 35% direct).

You:  Research the latest about HeyGen for a LinkedIn post.

AI:   [runs content-research-brief]

      📚 7 sources collected (5 fully fetched)
      🏷️ Tags: AI (7), Funding (2), Tools (5)

      Key stats:
      - "$60M Series A at $500M valuation" — TechCrunch
      - "40,000+ businesses use HeyGen" — company blog
      - "Avatar 3.0 launched with real-time lip sync" — The Verge

      3 angles generated:
      1. "HeyGen just raised $60M — here's what it means for AI video"
      2. "I tested HeyGen vs Synthesia for 30 days — honest comparison"
      3. "AI video tools are killing the $45B production industry"

You:  Write angle 2 as a LinkedIn post with an infographic.

AI:   [runs viral-post-writer + infographic-generator]

      Post: 1,200-char comparison post, bold claim hook,
      soft CTA in comments, FTC disclosure.

      Infographic: side-by-side comparison card (1080×1350),
      HeyGen vs Synthesia — commission, features, pricing.
      Dark modern palette, self-contained HTML ready to render.

You:  Now a TikTok script.

AI:   [runs tiktok-script-writer]

      45-second script, demo_first hook (backed by scout data):
      "Watch me create a $2,000 video for free in 30 seconds."
      Hook → Pain → Demo → Result → CTA. Bio link reminder.

You:  Plan my full funnel — I have 5 hours/week.

AI:   [runs funnel-planner]

      Week 1: Scout + Research → find winning angles + collect sources
      Week 2: Content → 5 LinkedIn posts + 2 TikToks + 2 infographics
      Week 3: Blog → comparison article backed by research brief
      Week 4: Deploy → landing page + bio link live
      Week 5: Analytics → compare your metrics vs scout benchmark
      Week 6: Optimize → double down on what beat the benchmark

      Target: first affiliate click by week 2, first commission by week 5.
```

---

## Who this is for

**Affiliates** — Find programs, create content, track performance. Data-driven, not vibes.

**Influencers & Creators** — Research what's trending, create platform-native content, add infographics. Know what format and hook to use before you create.

**Marketers** — Content research, competitive analysis, multi-platform strategy. Research briefs replace guesswork with real sources and stats.

**Affiliate Networks** — Evaluate program quality, benchmark advertiser traffic, understand affiliate landscape. `traffic-analyzer` + `affiliate-program-search` as audit tools.

**Advertisers** — Audit your own program positioning. See how affiliates talk about your product. Understand what content drives the most engagement for your brand.

**AI-native teams** — Plug skills into any agent pipeline. Every skill has typed input/output schemas, `chain_metadata`, and `suggested_next` for autonomous chaining.

This is not a prompt pack. It is an operating system for affiliates who ship.

---

## Get Started

> **[QUICKSTART.md](QUICKSTART.md)** — Platform-specific setup for Claude Code, Pi, ChatGPT, Cursor, Gemini, and more.

### Fastest way (any AI, no install)

1. Copy the [bootstrap prompt](prompts/bootstrap.md) (everything below the `---` line)
2. Paste it into your AI
3. Start: *"Scout trending content about AI writing tools, then find me the best program"*

### Claude Code / Pi (full integration)

```bash
git clone https://github.com/Affitor/affiliate-skills.git ~/.claude/skills/affiliate-skills
cd ~/.claude/skills/affiliate-skills && ./setup
```

Then tell your agent to add affiliate-skills to your project's CLAUDE.md. You get the `affiliate-check` CLI, automatic skill discovery, and full flywheel chaining.

### ChatGPT / Gemini / Any AI

1. Copy [`prompts/bootstrap.md`](prompts/bootstrap.md) into your conversation or project instructions
2. Optionally upload [`registry.json`](registry.json) and [`API.md`](API.md) as knowledge files
3. Done — your AI is now an affiliate marketing agent

### Cursor / Windsurf

```bash
git clone https://github.com/Affitor/affiliate-skills.git
```

Open the folder — `.cursorrules` configures the AI automatically.

---

## The Affiliate Flywheel — 8 Stages, 50 Skills

### S1: Research & Discovery (9 skills)
Find programs, scout trending content, analyze traffic, rank angles.

| Skill | Description |
|-------|-------------|
| [affiliate-program-search](skills/research/affiliate-program-search/) | Research and score programs from list.affitor.com |
| [niche-opportunity-finder](skills/research/niche-opportunity-finder/) | Find underserved niches with high potential |
| [competitor-spy](skills/research/competitor-spy/) | Analyze competitor affiliate strategies + engagement |
| [commission-calculator](skills/research/commission-calculator/) | Calculate and compare commission structures |
| [monopoly-niche-finder](skills/research/monopoly-niche-finder/) | Find intersection niches where you're the ONLY voice (Thiel) |
| [purple-cow-audit](skills/research/purple-cow-audit/) | Score product remarkability 1-10 before promoting (Godin) |
| [trending-content-scout](skills/research/trending-content-scout/) | 🆕 Scan YouTube/TikTok/X/Reddit for top content by engagement |
| [content-angle-ranker](skills/research/content-angle-ranker/) | 🆕 Rank content angles by data — competition, engagement, platform fit |
| [traffic-analyzer](skills/research/traffic-analyzer/) | 🆕 Analyze website traffic, rank, sources. Evaluate advertiser health |

### S2: Content Creation (7 skills)
Research-backed, data-driven content with visual assets.

| Skill | Description |
|-------|-------------|
| [viral-post-writer](skills/content/viral-post-writer/) | LinkedIn, X, Reddit, Facebook posts — now with data-driven format selection |
| [twitter-thread-writer](skills/content/twitter-thread-writer/) | Multi-tweet threads with hooks |
| [reddit-post-writer](skills/content/reddit-post-writer/) | Authentic Reddit posts with disclosure |
| [tiktok-script-writer](skills/content/tiktok-script-writer/) | Short-form video scripts — now with top performer analysis |
| [content-pillar-atomizer](skills/content/content-pillar-atomizer/) | 1 article → 15-30 platform-native pieces — now with platform allocation |
| [content-research-brief](skills/content/content-research-brief/) | 🆕 Collect sources, extract stats, generate research-backed content angles |
| [infographic-generator](skills/content/infographic-generator/) | 🆕 Branded infographic specs from any content — LinkedIn-optimized |

### S3: Blog & SEO (7 skills)
Long-form SEO-optimized articles that rank and convert.

| Skill | Description |
|-------|-------------|
| [affiliate-blog-builder](skills/blog/affiliate-blog-builder/) | Full review and how-to articles |
| [comparison-post-writer](skills/blog/comparison-post-writer/) | Head-to-head product comparisons |
| [listicle-generator](skills/blog/listicle-generator/) | "Top N" roundup articles |
| [how-to-tutorial-writer](skills/blog/how-to-tutorial-writer/) | Tutorial articles with product integration |
| [keyword-cluster-architect](skills/blog/keyword-cluster-architect/) | Map 50-200+ keywords into topical clusters |
| [content-moat-calculator](skills/blog/content-moat-calculator/) | Estimate pages needed for topical authority |
| [content-decay-detector](skills/blog/content-decay-detector/) | Monitor content for ranking drops, trigger refresh |

### S4: Offers & Landing Pages (8 skills)
Irresistible offers and high-converting pages — pure HTML/CSS, no dependencies.

| Skill | Description |
|-------|-------------|
| [landing-page-creator](skills/landing/landing-page-creator/) | AIDA-framework landing pages |
| [product-showcase-page](skills/landing/product-showcase-page/) | Single-product showcase |
| [squeeze-page-builder](skills/landing/squeeze-page-builder/) | Lead capture pages |
| [webinar-registration-page](skills/landing/webinar-registration-page/) | Event-based promotion |
| [grand-slam-offer](skills/landing/grand-slam-offer/) | Hormozi Value Equation offer design |
| [bonus-stack-builder](skills/landing/bonus-stack-builder/) | Exclusive bonus packages for YOUR link |
| [guarantee-generator](skills/landing/guarantee-generator/) | Personal guarantees for risk reversal |
| [value-ladder-architect](skills/landing/value-ladder-architect/) | Free → tripwire → core → upsell journey |

### S5: Distribution & Deployment (4 skills)
Get your content live and distributed.

| Skill | Description |
|-------|-------------|
| [bio-link-deployer](skills/distribution/bio-link-deployer/) | Linktree alternative you own |
| [email-drip-sequence](skills/distribution/email-drip-sequence/) | 5-7 email nurture sequence |
| [social-media-scheduler](skills/distribution/social-media-scheduler/) | Posting schedule and calendar |
| [github-pages-deployer](skills/distribution/github-pages-deployer/) | Deploy to GitHub Pages |

### S6: Analytics & Optimization (5 skills)
Track, measure, optimize — and feed data back to S1.

| Skill | Description |
|-------|-------------|
| [conversion-tracker](skills/analytics/conversion-tracker/) | UTM links, tracking pixels, attribution |
| [ab-test-generator](skills/analytics/ab-test-generator/) | A/B test variants for headlines and CTAs |
| [performance-report](skills/analytics/performance-report/) | Weekly/monthly KPI reports |
| [seo-audit](skills/analytics/seo-audit/) | 10-dimension SEO scorecard |
| [internal-linking-optimizer](skills/analytics/internal-linking-optimizer/) | Hub-and-spoke internal link structure |

### S7: Automation & Scale (5 skills)
Automate workflows and scale what's working.

| Skill | Description |
|-------|-------------|
| [email-automation-builder](skills/automation/email-automation-builder/) | Branching email flows with conditions |
| [content-repurposer](skills/automation/content-repurposer/) | One piece of content → multiple formats |
| [multi-program-manager](skills/automation/multi-program-manager/) | Affiliate program portfolio strategy |
| [paid-ad-copy-writer](skills/automation/paid-ad-copy-writer/) | Ad copy for Facebook, Google, TikTok |
| [proprietary-data-generator](skills/automation/proprietary-data-generator/) | Original surveys, benchmarks, data moats |

### S8: Meta (5 skills)
Cross-cutting skills for discovery, planning, compliance, and strategy.

| Skill | Description |
|-------|-------------|
| [skill-finder](skills/meta/skill-finder/) | Find the right skill for any goal |
| [funnel-planner](skills/meta/funnel-planner/) | Plan a complete affiliate funnel roadmap |
| [compliance-checker](skills/meta/compliance-checker/) | FTC compliance and platform rules audit |
| [self-improver](skills/meta/self-improver/) | Campaign retrospective and improvement plan |
| [category-designer](skills/meta/category-designer/) | Define a new category where your product wins |

---

Machine-readable index: [`registry.json`](registry.json) · API docs: [`API.md`](API.md) · Skill template: [`template/SKILL.md`](template/SKILL.md) · Spec: [`spec/`](spec/)

## Companion Tools

affiliate-skills are pure Markdown — they work with any AI. For enhanced capabilities, pair with these tools:

### [hidrix-tools](https://github.com/sonpiaz/hidrix-tools) — MCP Server

MCP server providing live social data tools. When connected, skills like `trending-content-scout` get exact engagement metrics instead of web search estimates.

| Tool | What it adds |
|------|-------------|
| `youtube_search` | YouTube video search with structured data |
| `tiktok_search` | TikTok search with play counts and likes |
| `x_search` | X/Twitter top tweet search |
| `reddit_search` | Reddit posts with scores and comments |
| `similarweb_traffic` | Website traffic analytics |
| `web_search` | Brave Search for web research |
| `web_fetch` | URL → clean markdown extraction |

```bash
# Install
git clone https://github.com/sonpiaz/hidrix-tools.git ~/.hidrix-tools
cd ~/.hidrix-tools && bun install && cp .env.example .env
# Add your API keys to .env
```

### [content-pipeline](https://github.com/Affitor/content-pipeline) — LinkedIn Content App

Web app for the full content creation workflow: research → write → infographic. Uses Brave Search + Claude + Satori rendering. The skills `content-research-brief` and `infographic-generator` were inspired by this pipeline.

```bash
git clone https://github.com/Affitor/content-pipeline.git
cd content-pipeline && npm install && cp .env.example .env.local
npm run dev
```

---

## How it works

Each skill is a single Markdown file (`SKILL.md`) that tells any AI exactly how to execute a specific affiliate marketing task. Skills define:

- **When to trigger** — natural language patterns that activate the skill
- **Input/Output schemas** — structured data for agent interop
- **Workflow** — step-by-step procedure with decision points
- **Chaining** — how outputs from one skill feed into the next
- **API integration** — optional API configs for enhanced data (see [`social-data-providers.md`](shared/references/social-data-providers.md))

Skills pass data through conversation context, not files. Run S1 to scout trending content, then S2 uses that engagement data automatically — no copy-pasting.

## Entry points

You don't have to start from S1. Jump in wherever you are:

- **New to affiliate marketing:** S8 `funnel-planner` → it plans everything for you
- **Want to see what's trending:** S1 `trending-content-scout` → scan platforms for top content
- **Have a product already:** S2 (write content) or S3 (write a review)
- **Need research first:** S2 `content-research-brief` → collect sources before writing
- **Have content, need pages:** S4 (landing page) or S5 (bio link)
- **Want to optimize:** S6 (analytics + SEO audit)
- **Ready to scale:** S7 (automation + paid ads)
- **Not sure which skill:** S8 `skill-finder`

## For Developers

Building an agent pipeline? Here's what you need:

- **[`registry.json`](registry.json)** — machine-readable index of all 50 skills with metadata
- **[`API.md`](API.md)** — full REST API documentation for list.affitor.com
- **[`prompts/bootstrap.md`](prompts/bootstrap.md)** — system prompt that bootstraps the full agent
- **[`social-data-providers.md`](shared/references/social-data-providers.md)** — configure API providers for social data
- **`agents/openai.yaml`** — OpenAI-compatible tool definitions (in skills that have them)
- **Input/Output schemas** — every SKILL.md has typed schemas for structured data exchange

## Contributing

We welcome skills from the community. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to submit your own skill.

Every merged skill gets published to [list.affitor.com/skills](https://list.affitor.com/skills).

## License

MIT

---

Built by [Affitor](https://affitor.com). Directory: [list.affitor.com](https://list.affitor.com)
