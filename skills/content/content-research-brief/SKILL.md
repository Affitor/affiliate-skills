---
name: content-research-brief
description: >
  Research trending topics, collect source articles, and generate a structured research
  brief for content creation. Stop writing from thin air — write from real sources.
  Use this skill when the user wants to research a topic before writing, collect sources
  for an article, create a research-backed content brief, or says "research [topic] for
  me", "find sources about [keyword]", "content brief for [topic]", "what's the latest
  on [product]", "research before writing", "collect articles about [keyword]",
  "trending news about [topic]", "gather sources for my article", "brief me on [topic]",
  "what are people saying about [product]", "news roundup for [keyword]",
  "research brief", "source collection", "content research", "prep research for writing".
license: MIT
version: "1.0.0"
tags: ["affiliate-marketing", "content-creation", "research", "content-brief", "source-collection"]
compatibility: "Claude Code, ChatGPT, Gemini CLI, Cursor, Windsurf, OpenClaw, any AI agent"
metadata:
  author: affitor
  version: "1.0"
  stage: S2-Content
---

# Content Research Brief

Research a topic by collecting 5-10 real source articles, auto-tagging them by theme,
extracting key data points, and synthesizing unique content angles. The output is a
structured research brief that any downstream content skill can consume.

**The problem this solves:** Most AI-written affiliate content is generic because it's
written from the model's training data — not from real, current sources. This skill
forces research-first content creation: find real articles, extract real data, then
write from those sources. The result is content with specific stats, real quotes, and
current information that readers (and Google) actually value.

Inspired by the [content-pipeline](https://github.com/Affitor/content-pipeline) approach:
Topic → Search → Select sources → Synthesize → Write with context.

## Stage

This skill belongs to Stage S2: Content — but acts as the research foundation for all content skills.

## When to Use

- Before writing any article, blog post, or long-form content
- When you need current data and stats about a topic (not just AI-generated claims)
- When creating comparison content (need real feature/pricing data from sources)
- When writing about a product launch, funding round, or industry trend
- After `trending-content-scout` identifies a topic — research it deeper
- When you want unique angles: N sources → N different content pieces

## Input Schema

```yaml
topic: string                  # (required) "HeyGen AI video tool", "email marketing trends 2024"
source_count: number           # (optional, default: 7) How many sources to collect (3-10)
source_types: string[]         # (optional, default: ["news", "blog"])
                               # Options: "news" | "blog" | "linkedin" | "youtube" | "reddit" | "academic"
freshness: string              # (optional, default: "month") "day" | "week" | "month" | "year" | "any"
product: object                # (optional) Focus research on a specific product
  name: string                 # "HeyGen"
  url: string                  # "https://heygen.com"
language: string               # (optional, default: "en") "en" | "vi" | any ISO 639-1 code
angle_count: number            # (optional, default: 3) How many unique content angles to generate
```

## Workflow

### Step 1: Search for Sources

Execute multiple searches to find diverse, high-quality sources:

```
Primary search:
  web_search "[topic]" → top results
  
Source-type-specific searches:
  IF "news" in source_types:
    web_search "[topic] news [current year]" → recent news articles
  IF "blog" in source_types:
    web_search "[topic] blog review analysis" → in-depth blog posts
  IF "linkedin" in source_types:
    web_search "[topic] site:linkedin.com" → LinkedIn posts/articles
  IF "youtube" in source_types:
    web_search "[topic] site:youtube.com" → YouTube videos with descriptions
  IF "reddit" in source_types:
    web_search "[topic] site:reddit.com" → Reddit discussions with real user opinions
  IF "academic" in source_types:
    web_search "[topic] research study data statistics" → data-heavy sources

Product-specific (if product provided):
  web_search "[product.name] review [current year]"
  web_search "[product.name] alternatives comparison"
  web_search "[product.name] pricing features"
  web_search "[product.name] news launch update"
```

Collect 15-20 search results, then filter down to `source_count` best sources.

### Step 2: Fetch and Extract Source Content

For each selected source:
1. `web_fetch [url]` → extract full article text
2. If fetch fails (paywall, timeout) → use search snippet as summary, note limitation
3. Extract from each source:
   - **Title** and **URL**
   - **Published date** (if available)
   - **Key data points**: stats, numbers, percentages, dollar amounts
   - **Key quotes**: noteworthy statements from experts or users
   - **Main argument/thesis**: what is this source's core message?
   - **Unique information**: what does this source have that others don't?

### Step 3: Auto-Tag Sources

Tag each source with 1-3 theme tags:

| Tag | Trigger Keywords |
|-----|-----------------|
| **AI** | artificial intelligence, machine learning, GPT, neural, model |
| **Funding** | raised, funding, series A/B/C, investment, valuation, IPO |
| **SaaS** | software, subscription, platform, B2B, enterprise |
| **Tools** | tool, app, feature, integration, API, plugin |
| **Trends** | trend, growing, emerging, future, prediction, forecast |
| **Startup** | startup, founder, launch, early-stage, bootstrapped |
| **Growth** | revenue, ARR, users, growth, scale, market share |
| **Industry** | market, industry, sector, regulation, compliance |
| **Pricing** | pricing, cost, free tier, discount, plan, subscription |
| **Comparison** | vs, versus, alternative, compare, switch, migrate |
| **Tutorial** | how to, guide, step-by-step, tutorial, walkthrough |
| **Opinion** | I think, in my experience, hot take, unpopular opinion |

### Step 4: Extract Key Data Points

From all sources combined, extract a master list of:

**Stats & Numbers:**
- Revenue/valuation figures
- User counts / growth rates
- Market size data
- Performance metrics
- Pricing data points

**Quotes & Insights:**
- Expert opinions
- User testimonials (from Reddit, reviews)
- Founder/CEO statements
- Analyst predictions

**Facts & Features:**
- Product features mentioned across multiple sources
- Recent updates/launches
- Integration ecosystem
- Competitive positioning

### Step 5: Synthesize Unique Angles

From the collected sources, generate `angle_count` unique content angles.

**Angle generation rules:**
1. Each angle must use a DIFFERENT primary source as its foundation
2. All angles use ALL sources as context (richer data)
3. Each angle must have a distinct hook and perspective
4. At least one angle should be contrarian or non-obvious

**For each angle:**
```yaml
Angle:
  title: string                # Specific, could be a headline
  primary_source: string       # Which source drives this angle
  hook: string                 # Opening line
  key_data: string[]           # 2-3 data points from sources that support this angle
  format_suggestion: string    # "linkedin_post" | "blog_article" | "tiktok_script" | "twitter_thread"
  unique_value: string         # What makes this angle different from generic AI-written content
```

### Step 6: Compile Research Brief

Organize everything into a structured brief that downstream skills can consume.

### Step 7: Self-Validation

Before presenting output, verify:

- [ ] All sources are real URLs (not hallucinated)
- [ ] Data points are attributed to specific sources
- [ ] At least 3 sources were successfully fetched (not just search snippets)
- [ ] Angles are genuinely different from each other (not rephrased versions)
- [ ] Tags accurately reflect source content
- [ ] Brief includes both positive and critical/balanced perspectives

If any check fails, fix before delivering. Do not flag checklist to user.

## Output Schema

```yaml
output_schema_version: "1.0.0"
topic: string
sources_collected: number
sources_fetched: number                # how many were fully fetched vs snippet-only
sources:
  - title: string
    url: string
    published_date: string | null
    tags: string[]                     # ["AI", "Tools", "Pricing"]
    key_data_points: string[]          # extracted stats and numbers
    key_quotes: string[]               # notable quotes
    main_thesis: string                # 1-sentence summary
    unique_info: string                # what's unique about this source
    fetch_status: "full" | "snippet"   # transparency
master_data:
  stats: string[]                      # all stats across all sources, deduplicated
  quotes: string[]                     # all notable quotes
  facts: string[]                      # key facts and features
  timeline: string[]                   # chronological events if applicable
angles:
  - title: string
    primary_source: string
    hook: string
    key_data: string[]
    format_suggestion: string
    unique_value: string
recommended_next_skill: string
```

## Output Format

```markdown
## Content Research Brief: [Topic]

📚 **[X] sources collected** | [Y] fully fetched | Freshness: [month]
🏷️ **Top tags:** AI (5), Tools (3), Pricing (2), Comparison (2)

---

### 📰 Sources

| # | Title | Tags | Date | Status |
|---|-------|------|------|--------|
| 1 | [Title](url) | AI, Tools | Mar 2024 | ✅ Full |
| 2 | [Title](url) | Pricing, Comparison | Feb 2024 | ✅ Full |
| 3 | [Title](url) | Trends, Growth | Mar 2024 | ⚠️ Snippet |
| ... | ... | ... | ... | ... |

---

### 📊 Key Data Points (from sources)

**Stats:**
- [Stat 1] — Source: [#1]
- [Stat 2] — Source: [#3]
- [Stat 3] — Source: [#2, #5]

**Quotes:**
- "[Quote]" — [Person], [Role] (Source: [#4])
- "[Quote]" — [Person] (Source: [#2])

**Key Facts:**
- [Fact 1] — mentioned in [X] sources
- [Fact 2] — mentioned in [Y] sources

---

### 🎯 Content Angles (ready to write)

#### Angle 1: "[Title]"
- **Primary source:** [#2] — [title]
- **Hook:** "[Opening line]"
- **Key data:** [stat 1], [stat 2], [quote]
- **Best format:** LinkedIn post
- **Unique value:** [Why this isn't generic]
→ Run: `viral-post-writer` with angle: "[this angle]"

#### Angle 2: "[Title]"
- **Primary source:** [#5] — [title]
- **Hook:** "[Opening line]"
- **Key data:** [stat 3], [fact 1]
- **Best format:** Blog article
- **Unique value:** [Why this is different from Angle 1]
→ Run: `affiliate-blog-builder` with angle: "[this angle]"

#### Angle 3: "[Title]" (Contrarian)
- **Primary source:** [#7] — [title]
- **Hook:** "[Opening line]"
- **Key data:** [counter-stat], [user complaint from Reddit]
- **Best format:** Twitter thread
- **Unique value:** Goes against the dominant narrative — [reasoning]
→ Run: `twitter-thread-writer` with angle: "[this angle]"

---

### 🚀 Next Steps

1. **Pick an angle** and run the suggested content skill
2. **Combine angles** — use `content-pillar-atomizer` to turn one angle into 15+ pieces
3. **Add visuals** — use `infographic-generator` to create a data infographic from the key stats
```

## Error Handling

- **Topic too vague:** Ask user to narrow down. *"'Marketing' is too broad. Can you specify? e.g., 'email marketing automation tools' or 'TikTok marketing for SaaS'."*
- **Few sources found:** If <3 sources, note: *"Limited sources available for this topic. The brief may lack depth. Consider broadening the topic or checking if it's too niche."*
- **Most sources behind paywalls:** Use search snippets. Note: *"[X] sources couldn't be fully fetched (paywalls). Brief uses search snippets for those. Data may be less detailed."*
- **Sources are all from the same perspective:** Note bias. *"Warning: all [X] sources are positive reviews. No critical perspectives found. Consider adding 'reddit' or 'opinion' to source_types for balanced content."*
- **Outdated sources:** If freshness filter returns old results, widen the time range and note: *"Most recent sources are from [date]. This topic may not have recent coverage."*
- **Non-English topic:** Research in the specified language. Note if source diversity is limited in that language.

## Examples

**Example 1:**
User: "Research HeyGen for a LinkedIn post"
→ topic: "HeyGen AI video", source_types: ["news", "blog", "linkedin"], freshness: "month"
→ Collect 7 sources: 2 news (HeyGen raises $60M), 3 blog reviews, 2 LinkedIn posts
→ Tags: AI (7), Funding (2), Tools (5), Comparison (1)
→ Key stats: "$60M Series A", "40K+ businesses", "Avatar 3.0 launch"
→ Angles: (1) "HeyGen just raised $60M — here's what it means for AI video" (LinkedIn),
  (2) "I tested HeyGen vs Synthesia for 30 days" (blog), (3) "AI video tools are killing
  the $45B video production industry" (Twitter thread)

**Example 2:**
User: "Brief me on email marketing trends, I want to write a comparison blog post"
→ topic: "email marketing trends 2024", source_types: ["news", "blog", "reddit"]
→ Collect 8 sources covering: AI personalization, interactive emails, privacy changes, deliverability
→ Angles focused on comparison: "ConvertKit vs Mailchimp in 2024: the real differences after
  Apple Mail Privacy Protection"

**Example 3:**
User: "Research what people are really saying about ClickUp on Reddit"
→ topic: "ClickUp", source_types: ["reddit", "blog"], freshness: "month"
→ 4 Reddit threads (raw opinions), 3 blog reviews
→ Unique angle: Reddit users love the free tier but hate the learning curve →
  "ClickUp: the free tool that takes a month to learn (and why it's still worth it)"

## Feedback & Issue Reporting

When this skill produces unexpected, incomplete, or incorrect output, generate a
`skill_feedback` block (see `shared/references/feedback-protocol.md` for full schema).

**Skill-specific failure modes:**
- **Most sources paywalled:** <3 sources fully fetched. Report as `data_quality`, list which URLs failed.
- **All sources same perspective:** No balanced/critical viewpoints found. Report as `data_quality`, note bias direction.
- **Hallucinated stats:** Agent generated a stat not from any fetched source. Report as `hallucination`, critical severity.
- **Angles not unique:** All 3 angles are rephrased versions of the same take. Report as `wrong_output`.

**Auto-detect triggers:**
- `sources_fetched` < 3 (most failed)
- All source `tags` are identical (no diversity)
- Any data point in `master_data.stats` cannot be traced to a specific source URL
- `angles` array has <2 entries

Report issues: [GitHub Issues](https://github.com/Affitor/affiliate-skills/issues/new?labels=skill-feedback&title=content-research-brief) | [Discussions](https://github.com/Affitor/affiliate-skills/discussions/categories/ideas)

## References

- `shared/references/social-data-providers.md` — API configuration for enhanced search
- `shared/references/flywheel-connections.md` — master flywheel connection map
- `shared/references/ftc-compliance.md` — source attribution and disclosure requirements
- `shared/references/feedback-protocol.md` — issue detection and reporting standard

## Flywheel Connections

### Feeds Into
- `viral-post-writer` (S2) — research brief with angles, data points, and quotes
- `affiliate-blog-builder` (S3) — deep research for long-form articles
- `tiktok-script-writer` (S2) — key stats and hooks for video scripts
- `twitter-thread-writer` (S2) — data-rich thread material
- `reddit-post-writer` (S2) — real user opinions for authentic Reddit content
- `content-pillar-atomizer` (S2) — research brief as the pillar to atomize
- `infographic-generator` (S2) — key stats and data for visual content
- `comparison-post-writer` (S3) — multi-source comparison data
- `listicle-generator` (S3) — curated sources for listicle content

### Fed By
- `trending-content-scout` (S1) — trending topics and content gaps to research deeper
- `niche-opportunity-finder` (S1) — niche keywords to research
- `content-angle-ranker` (S1) — recommended angle to research supporting data
- `competitor-spy` (S1) — competitor strategies to research and counter

### Feedback Loop
- S6 `performance-report` shows which content with research briefs outperforms non-researched content → reinforces research-first workflow

```yaml
chain_metadata:
  skill_slug: "content-research-brief"
  stage: "content"
  timestamp: string
  suggested_next:
    - "viral-post-writer"
    - "affiliate-blog-builder"
    - "infographic-generator"
    - "content-pillar-atomizer"
```
