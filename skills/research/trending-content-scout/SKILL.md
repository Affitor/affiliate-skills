---
name: trending-content-scout
description: >
  Scan social platforms for top-performing content by engagement before you create anything.
  Use this skill when the user wants to see what content is winning in a niche, find viral
  content patterns, research what's working on YouTube/TikTok/X/Reddit, benchmark engagement,
  discover content gaps, or says "what content is working for [topic]", "show me top performing
  content about [keyword]", "what's trending in [niche]", "find viral content about [product]",
  "content research for [keyword]", "what gets views in [niche]", "engagement analysis for
  [topic]", "scout the competition", "what videos are getting the most views about [keyword]",
  "social listening for [topic]", "trending content in [niche]", "top content analysis",
  "what hooks work for [keyword]", "content intelligence", "find winning formats".
license: MIT
version: "1.0.0"
tags: ["affiliate-marketing", "research", "social-data", "engagement", "trending", "content-intelligence"]
compatibility: "Claude Code, ChatGPT, Gemini CLI, Cursor, Windsurf, OpenClaw, any AI agent"
metadata:
  author: affitor
  version: "1.0"
  stage: S1-Research
---

# Trending Content Scout

Scan YouTube, TikTok, X, and Reddit for top-performing content by real engagement data.
Find winning formats, hooks, and content gaps — **before** you create anything. Stop
guessing what works. See what's already winning, then build on proven patterns.

This skill is the **data foundation** for the entire content pipeline. Run it first,
then feed its output into `content-angle-ranker`, `viral-post-writer`, `tiktok-script-writer`,
or any S2/S3 content skill.

## Stage

This skill belongs to Stage S1: Research

## When to Use

- Before creating any content for a keyword or niche
- When entering a new niche and need to understand what content works
- When comparing engagement across platforms for a topic
- When looking for content gaps competitors haven't filled
- When benchmarking your existing content against what's performing
- As the first step in any content creation workflow (before S2 skills)

## Input Schema

```yaml
keyword: string               # (required) Search keyword — "AI video tools", "email marketing tips"
platforms: string[]            # (optional, default: ["youtube", "tiktok"])
                               # Options: "youtube" | "tiktok" | "x" | "reddit"
sort_by: string                # (optional, default: "engagement_score")
                               # Options: "views" | "likes" | "engagement_score" | "recency"
time_range: string             # (optional, default: "30d") "7d" | "30d" | "90d" | "all"
limit: number                  # (optional, default: 20) Max content pieces to analyze
product: object                # (optional) Specific product to focus on
  name: string                 # "HeyGen"
  url: string                  # "https://heygen.com"
```

No `api_config` needed in input — skills auto-detect configuration from conversation
context, project settings, or CLAUDE.md. See `shared/references/social-data-providers.md`
for setup instructions.

## Workflow

### Step 1: Determine Data Source

Check if the user has API configuration available:

```
IF social_data_config exists in context/settings for a platform:
  → Use configured API for that platform
  → Structured data: exact views, likes, comments, shares
  
ELSE (default — no API):
  → Use web_search + web_fetch
  → Still effective — see fallback methods below
```

**API mode** (when configured):

For each platform in `platforms`:
- YouTube: Search API → get video list → Details API → get statistics (views, likes, comments)
- TikTok: Search API → get video list with stats (playCount, diggCount, commentCount, shareCount)
- X: Search API → get tweets with public_metrics (impressions, likes, retweets, replies)
- Reddit: Search API → get posts with score and comment count

See `shared/references/social-data-providers.md` for specific API endpoints and config.

**web_search fallback** (no API — default):

```
For YouTube:
  web_search "[keyword] site:youtube.com" → top 10-15 video results
  For each result: extract title, channel, view count from search snippet
  Optional: web_fetch individual video pages for likes/comments (slower)

For TikTok:
  web_search "[keyword] tiktok" → find popular TikTok content
  web_search "[keyword] site:tiktok.com" → direct TikTok results
  Extract: titles, creators, approximate view counts from snippets

For X:
  web_search "[keyword] site:x.com" OR "[keyword] site:twitter.com" → top tweets
  Extract: tweet text, author, engagement signals from snippets

For Reddit:
  web_search "[keyword] site:reddit.com" → top Reddit discussions
  web_fetch top results → extract upvotes, comments from page
  web_search "reddit [keyword] top upvoted" → find popular threads
```

Note which data source was used — include in output for transparency.

### Step 2: Collect and Normalize Data

For each content piece found, extract and normalize into a standard schema:

```yaml
ContentItem:
  title: string                # Video title, tweet text (first line), post title
  url: string                  # Direct link to content
  platform: string             # "youtube" | "tiktok" | "x" | "reddit"
  creator: string              # Channel name, @handle, username
  views: number                # View/impression count (0 if unavailable)
  likes: number                # Like/upvote count (0 if unavailable)
  comments: number             # Comment/reply count (0 if unavailable)
  shares: number               # Share/retweet count (0 if unavailable)
  published_date: string       # ISO date or relative ("3 days ago")
  duration: string             # Video duration ("2:34") — video only
  engagement_score: number     # Calculated — see formula below
  content_format: string       # Detected format (see classification below)
  hook_type: string            # Detected hook style (see classification below)
```

**Engagement Score Formula** (consistent across all Affitor skills):

```
engagement_score = (likes × 2 + comments × 3 + shares × 5) / max(views, 1) × 1000
```

Platform-specific adjustments:
- **Reddit:** `(score × 2 + num_comments × 3) / max(score, 1) × 1000` (no share count)
- **X:** Use retweets as shares, replies as comments
- **YouTube:** Estimate shares as `comments × 0.5` (not available via most APIs)
- **web_search fallback:** If only views are available, use `views` as the ranking signal and note that engagement_score is estimated

See `shared/references/social-data-providers.md` for full formula documentation.

**Content Format Classification:**

Detect format from title and description:
- **comparison:** Contains "vs", "versus", "compared to", "X or Y", "better than"
- **review:** Contains "review", "honest review", "worth it", "my experience"
- **tutorial:** Contains "how to", "step by step", "guide", "tutorial", "walkthrough"
- **listicle:** Contains "top X", "best X", "X tools", "X ways", numbers in title
- **reaction:** Contains "I tried", "testing", "first time using", "is it worth"
- **story:** Contains "how I", "my journey", "I made $X", personal narrative
- **demo:** Contains "demo", "showing", "watch me use", "in action"
- **explainer:** Contains "what is", "explained", "why you need", "everything about"

**Hook Type Classification:**

Detect from first sentence/title:
- **question:** Starts with or contains a question
- **shock:** Contains surprising numbers, "you won't believe", extreme claims
- **bold_claim:** "This replaced X", "The only tool you need", definitive statements
- **demo_first:** Starts with showing a result or end product
- **relatable:** "POV:", "When you...", shared experience pattern
- **contrarian:** "Stop using X", "X is overrated", against conventional wisdom

### Step 3: Sort and Rank

Sort all collected content by the chosen `sort_by` parameter:

- **engagement_score** (default): Best for finding content that resonates regardless of creator size
- **views**: Best for finding content with broadest reach
- **likes**: Best for finding content people actively endorse
- **recency**: Best for finding what's working RIGHT NOW

Take top `limit` results after sorting.

### Step 4: Analyze Patterns

From the top content, extract actionable patterns:

**Format Analysis:**
```
For each content_format in top results:
  count: how many of top 20 use this format
  avg_engagement: average engagement_score for this format
  best_example: highest engagement content in this format
```

**Hook Analysis:**
```
For each hook_type in top results:
  count: how many use this hook
  avg_engagement: average engagement_score
  best_example: highest engagement content with this hook
```

**Duration Analysis (video platforms only):**
```
Group videos by duration buckets:
  <30s, 30-60s, 60-120s, 2-5min, 5-10min, 10-20min, 20min+
For each bucket: count and average engagement
→ Identify optimal duration range
```

**Creator Analysis:**
```
For each unique creator in top results:
  content_count: how many pieces in top results
  avg_engagement: average engagement score
  platforms: which platforms they're on
  dominant_format: their most-used format
```

**Gap Analysis:**

This is the most strategically valuable output. Look for:

1. **Format gaps:** If 90% of top content is reviews, comparisons are underserved
2. **Platform gaps:** If YouTube is saturated but TikTok has few results → TikTok opportunity
3. **Angle gaps:** Common user questions (visible in comments/replies) that no top content addresses
4. **Audience gaps:** All content targets advanced users → beginner content is a gap
5. **Recency gaps:** Top content is 6+ months old → fresh take on same topic is an opportunity
6. **Honesty gaps:** All content is positive/promotional → honest cons/limitations review is a gap

For gap analysis with web_search fallback:
- `web_search "[keyword] reddit questions"` → find unanswered user questions
- `web_search "[keyword] alternatives nobody talks about"` → find underserved angles

### Step 5: Calculate Engagement Benchmark

Set benchmark ranges so user knows what "good" looks like:

```yaml
engagement_benchmark:
  sample_size: number           # how many content pieces analyzed
  median_views: number          # 50th percentile views
  median_engagement_score: number
  top_10_percent_threshold:
    views: number               # views needed to be in top 10%
    engagement_score: number    # engagement_score needed for top 10%
  platform_averages:            # per-platform breakdown
    youtube:
      median_views: number
      median_engagement: number
    tiktok:
      median_views: number
      median_engagement: number
```

### Step 6: Self-Validation

Before presenting output, verify:

- [ ] Data source is clearly stated (API vs web_search)
- [ ] Engagement scores are calculated consistently using the standard formula
- [ ] Content format and hook classifications are based on actual title/description analysis, not guesses
- [ ] Gap analysis includes at least 3 specific, actionable gaps
- [ ] Benchmark numbers are derived from actual data, not made up
- [ ] Recommendations connect to specific downstream skills

If any check fails, fix the output before delivering. Do not flag the checklist to the user.

## Output Schema

Other skills can consume these fields from conversation context:

```yaml
output_schema_version: "1.0.0"
keyword: string
platforms_scanned: string[]
data_source: "api" | "web_search" | "mixed"   # transparency
total_content_analyzed: number
top_content: ContentItem[]                     # top results sorted by sort_by
pattern_analysis:
  winning_formats:
    - format: string           # "comparison"
      count: number            # 9
      percentage: number       # 45
      avg_engagement: number   # 35.2
      best_example:
        title: string
        url: string
        engagement_score: number
  winning_hooks:
    - hook_type: string
      count: number
      avg_engagement: number
      best_example:
        title: string
        url: string
  optimal_duration:
    range: string              # "45-60 seconds"
    platform: string           # "tiktok"
    avg_engagement: number
  top_creators:
    - name: string
      platform: string
      content_count: number
      avg_engagement: number
      dominant_format: string
  content_gaps: string[]       # specific, actionable gaps
engagement_benchmark:
  sample_size: number
  median_views: number
  median_engagement_score: number
  top_10_percent_threshold:
    views: number
    engagement_score: number
  platform_averages: object
recommended_angles: string[]   # top 3 content angles based on gaps + engagement
recommended_next_skill: string # "content-angle-ranker"
```

## Output Format

```markdown
## Trending Content Scout: [Keyword]

### Data Source
📊 **[API: YouTube Data API + RapidAPI TikTok | web_search (no API configured)]**
Scanned: [X] content pieces across [Y] platforms
Time range: [30 days]

---

### 🏆 Top Performing Content

| # | Title | Platform | Creator | Views | Eng. Score | Format | Hook |
|---|-------|----------|---------|-------|------------|--------|------|
| 1 | [Title] | YouTube | @creator | 150K | 42.3 | comparison | bold_claim |
| 2 | [Title] | TikTok | @creator | 800K | 38.1 | demo | demo_first |
| 3 | [Title] | YouTube | @creator | 95K | 35.7 | tutorial | question |
| ... | ... | ... | ... | ... | ... | ... | ... |

---

### 📈 Pattern Analysis

**Winning Formats:**
| Format | Count | % of Top 20 | Avg Engagement | Verdict |
|--------|-------|-------------|----------------|---------|
| Comparison | 9 | 45% | 35.2 | 🔥 Dominant — proven winner |
| Tutorial | 5 | 25% | 28.4 | ✅ Solid performer |
| Review | 4 | 20% | 22.1 | ⚡ Works but competitive |
| Listicle | 2 | 10% | 18.5 | ➖ Below average |

**Best Hooks:**
1. 🥇 **Bold claim** — "This tool replaced my $5K/mo agency" (avg engagement: 41.3)
2. 🥈 **Demo first** — Show end result in first 3 seconds (avg: 36.8)
3. 🥉 **Contrarian** — "Stop using X, use this instead" (avg: 33.2)

**Duration Sweet Spot:**
- TikTok: 45-60 seconds (avg engagement: 34.2)
- YouTube: 8-12 minutes (avg engagement: 31.5)

**Top Creators in This Space:**
| Creator | Platform | Pieces in Top 20 | Avg Engagement | Style |
|---------|----------|-------------------|----------------|-------|
| @creator1 | YouTube | 4 | 38.5 | In-depth comparisons |
| @creator2 | TikTok | 3 | 35.2 | Quick demos |

---

### 🕳️ Content Gaps (Opportunities)

1. **[Gap 1]:** Nobody comparing [Product A] vs [Product B] on TikTok — YouTube has 5 comparisons, TikTok has zero
2. **[Gap 2]:** No "honest cons" content — all top content is positive. Authentic negative review = differentiation
3. **[Gap 3]:** Missing "[keyword] for [specific audience]" — all content targets general audience
4. **[Gap 4]:** Top content is 4-6 months old — fresh 2024 take is an opportunity
5. **[Gap 5]:** Reddit has high engagement (avg score: 450) but no affiliate content → underserved platform

---

### 📏 Engagement Benchmark

| Metric | Median | Top 10% Threshold | Your Target |
|--------|--------|-------------------|-------------|
| Views | 12,000 | 85,000 | Beat median to start |
| Engagement Score | 18.5 | 45.0 | Aim for top 10% |

**Per Platform:**
| Platform | Median Views | Median Engagement |
|----------|-------------|-------------------|
| YouTube | 25,000 | 22.3 |
| TikTok | 45,000 | 16.8 |

---

### 🎯 Recommended Next Steps

Based on this data, the highest-opportunity path is:

1. **Run `content-angle-ranker`** — rank specific angles for [best platform]
2. **Create a [winning format]** using a [best hook] hook
   → Skill: `viral-post-writer` (format: [format], hook: [hook])
3. **Fill [Gap 1]** — this is the lowest-competition, highest-potential opportunity
   → Skill: `tiktok-script-writer` (if TikTok) or `comparison-post-writer` (if blog)
```

## Error Handling

- **No API configured:** Fall back to web_search. Include note: *"Data from web_search is approximate. For exact engagement metrics, configure an API provider — see `shared/references/social-data-providers.md`"*
- **API rate limited:** Fall back to web_search for remaining platforms. Note which platforms used API vs web_search in output.
- **No content found for keyword:** The keyword may be too niche or too new.
  1. Try broadening: "[keyword]" → "[parent category]"
  2. Try removing platform filter: search across all platforms
  3. If still empty, this is itself a signal — could be a gap opportunity. Report: "No existing content found — this keyword is either too new or too niche. This could be a first-mover opportunity."
- **Platform blocked/unavailable:** Skip that platform, continue with others. Note: *"[Platform] was unavailable. Results are from [remaining platforms] only."*
- **web_search returns only a few results:** Present what's available. Note: *"Limited data available ([X] results). Patterns may not be representative. Consider configuring an API for better coverage."*
- **Engagement data partially available:** If only views are available (no likes/comments), sort by views and estimate engagement. Note: *"Engagement scores are estimated — only view counts were available."*

## Examples

**Example 1:**
User: "What content is working about HeyGen on TikTok?"
→ keyword: "HeyGen", platforms: ["tiktok"]
→ web_search "HeyGen tiktok" + "HeyGen site:tiktok.com" + "HeyGen TikTok viral"
→ Find 15 TikTok videos, extract view counts and creators
→ Pattern: demo_first hooks dominate (60%), 30-45s duration optimal
→ Gap: nobody doing "HeyGen for [specific profession]" content
→ Recommend: `tiktok-script-writer` with demo_first hook, 30s, angle: "HeyGen for real estate agents"

**Example 2:**
User: "I want to create content about email marketing tools. What's performing well?"
→ keyword: "email marketing tools", platforms: ["youtube", "tiktok", "reddit"]
→ Scout all 3 platforms
→ YouTube: dominated by listicles ("Top 10 email marketing tools 2024") — avg 45K views
→ TikTok: very few results — gap opportunity
→ Reddit: high engagement on comparison threads in r/emailmarketing
→ Recommend: Fill TikTok gap with comparison format, or target Reddit with authentic discussion

**Example 3:**
User: "Scout trending content about AI writing tools, I have RapidAPI configured"
→ Use configured APIs for YouTube + TikTok
→ Get exact engagement data: views, likes, comments, shares
→ Engagement scores calculated precisely
→ Pattern: "I replaced my copywriter with AI" hook has 3x average engagement
→ Output includes exact benchmark: median 18K views, top 10% needs 120K+
→ Recommend: `content-angle-ranker` to pick best angle, then `viral-post-writer`

## Feedback & Issue Reporting

When this skill produces unexpected, incomplete, or incorrect output, generate a
`skill_feedback` block (see `shared/references/feedback-protocol.md` for full schema).

**Skill-specific failure modes:**
- **Empty results on all platforms:** Keyword too niche or all APIs/web_search returned nothing. Report as `data_quality` with the keyword used.
- **Engagement scores all zero:** Metrics unavailable — only titles retrieved. Report as `data_quality`, note which platforms had no metrics.
- **Format/hook classification wrong:** Agent classified a tutorial as a review. Report as `wrong_output` with the misclassified content.

**Auto-detect triggers:**
- `top_content` array has <5 items after scanning all platforms
- `engagement_benchmark.sample_size` < 10
- >50% of `content_gaps` are generic rather than specific

Report issues: [GitHub Issues](https://github.com/Affitor/affiliate-skills/issues/new?labels=skill-feedback&title=trending-content-scout) | [Discussions](https://github.com/Affitor/affiliate-skills/discussions/categories/ideas)

## References

- `shared/references/social-data-providers.md` — API configuration and provider options
- `shared/references/flywheel-connections.md` — master flywheel connection map
- `shared/references/affiliate-glossary.md` — affiliate marketing terminology
- `shared/references/feedback-protocol.md` — issue detection and reporting standard

## Flywheel Connections

### Feeds Into
- `content-angle-ranker` (S1) — full scout output for angle scoring
- `viral-post-writer` (S2) — pattern_analysis (winning formats, hooks, benchmark)
- `tiktok-script-writer` (S2) — top TikTok content + engagement data
- `twitter-thread-writer` (S2) — top X threads + engagement data
- `reddit-post-writer` (S2) — top Reddit posts + engagement data
- `content-pillar-atomizer` (S2) — platform performance data for allocation
- `competitor-spy` (S1) — top_creators data (who's dominating this keyword)
- `keyword-cluster-architect` (S3) — engagement data per keyword for cluster prioritization
- `affiliate-blog-builder` (S3) — winning formats and gaps for blog content angles

### Fed By
- `competitor-spy` (S1) — competitor URLs/channels to analyze specifically
- `niche-opportunity-finder` (S1) — niche keywords to scout
- `performance-report` (S6) — your content metrics to compare against benchmark

### Feedback Loop
- S6 `performance-report` provides your actual content metrics → compare against `engagement_benchmark` from this skill → identify where you're beating or trailing the benchmark → refine content strategy in the next scout run

```yaml
chain_metadata:
  skill_slug: "trending-content-scout"
  stage: "research"
  timestamp: string
  suggested_next:
    - "content-angle-ranker"
    - "viral-post-writer"
    - "tiktok-script-writer"
```
