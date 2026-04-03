---
name: content-angle-ranker
description: >
  Rank content angles by engagement data, competition level, and platform fit.
  Data-driven angle selection instead of guesswork.
  Use this skill when the user has a keyword or product and needs to decide WHAT to create,
  which angle to take, which format to use, or which platform to target. Triggers on:
  "what angle should I use", "rank content ideas for [keyword]", "best angle for [product]",
  "which content idea will perform best", "help me pick an angle", "what should I write about",
  "content angle for [topic]", "rank my content ideas", "which approach will get the most views",
  "data-driven content planning", "angle ranker", "content scoring", "which hook should I use",
  "compare these content ideas", "prioritize my content angles", "what video should I make".
license: MIT
version: "1.0.0"
tags: ["affiliate-marketing", "research", "content-creation", "data-driven", "ranking", "angle-selection"]
compatibility: "Claude Code, ChatGPT, Gemini CLI, Cursor, Windsurf, OpenClaw, any AI agent"
metadata:
  author: affitor
  version: "1.0"
  stage: S1-Research
---

# Content Angle Ranker

You have a keyword. You know the niche. But what specific content should you create?
Which angle, format, and hook will actually perform? This skill answers that question
with data — not gut feeling.

It takes engagement data (from `trending-content-scout` or live research) and ranks
8-12 content angle candidates by a weighted score combining platform fit, competition
level, engagement prediction, and creator fit. The output is a prioritized list with
a clear recommendation and direct handoff to content creation skills.

Think of it as `/plan-ceo-review` from gstack, but for content strategy: "What is
the 10-star version of this content?" — except the answer is backed by engagement data.

## Stage

This skill belongs to Stage S1: Research — but it bridges directly into S2: Content Creation.

## When to Use

- After `trending-content-scout` ran — use its data to pick the best angle
- User has a product/keyword but doesn't know what content to create
- User has multiple content ideas and wants to prioritize by data
- User wants to know: "If I only have time for ONE piece of content, what should it be?"
- Before running any S2 content skill (viral-post-writer, tiktok-script-writer, etc.)

## Input Schema

```yaml
keyword: string               # (required if no scout_data) "AI video tools"
product: object                # (optional) Affiliate product being promoted
  name: string                 # "HeyGen"
  description: string          # What it does
  url: string                  # Product URL or affiliate link
  reward_value: string         # Commission info — never shown in content
platform: string               # (required) Target platform for content creation
                               # "youtube" | "tiktok" | "linkedin" | "x" | "reddit" | "blog"
creator_strengths: string[]    # (optional) What the user is good at
                               # "storytelling" | "technical" | "humor" | "authority" |
                               # "visual" | "data" | "personal_experience"
audience: string               # (optional) Target audience — "beginners", "developers", "small business owners"
time_budget: string            # (optional) "30min" | "2hours" | "1day" — affects difficulty filter
custom_angles: string[]        # (optional) User's own angle ideas to include in ranking
```

**Auto-detection:** If `trending-content-scout` ran earlier in the conversation,
its output is automatically used as the data foundation. No need to pass it explicitly.

## Workflow

### Step 1: Gather Engagement Data

**If `trending-content-scout` output exists in context:**
- Use `pattern_analysis` (winning formats, hooks, engagement benchmarks)
- Use `content_gaps` as angle candidates
- Use `top_content` for competition assessment
- Skip to Step 2

**If no scout data:**
Run a quick scout internally:
1. `web_search "[keyword] site:youtube.com"` → top 10 videos, note formats and view counts
2. `web_search "[keyword] site:tiktok.com"` OR `web_search "[keyword] tiktok viral"` → top TikTok content
3. `web_search "[keyword] site:reddit.com top"` → top Reddit discussions
4. `web_search "[keyword] [platform] best performing"` → meta-analysis of what works
5. Extract: dominant formats, popular hooks, view count ranges, gaps

This takes 30-60 seconds and provides enough signal for angle scoring.

### Step 2: Generate Angle Candidates (8-12)

Generate 8-12 specific content angle candidates. Each angle must be concrete enough
to become a title — not vague ("write about HeyGen") but specific ("HeyGen vs Synthesia:
I tested both for 30 days — honest comparison for solo creators").

**Sources for angles:**

1. **Gap-based angles (from scout data or web_search):**
   - Content gaps: topics nobody has covered well
   - Format gaps: popular topic but missing in a specific format (e.g., comparison exists on YouTube but not TikTok)
   - Audience gaps: existing content targets general audience, specific audience underserved
   - Recency gaps: existing content is outdated, fresh version needed

2. **Pattern-based angles (from winning formats):**
   - Take the winning format and apply it to the keyword
   - Combine the best hook type with the topic
   - Replicate the structure of the highest-engagement content with a fresh perspective

3. **Contrarian angles:**
   - If all content is positive → honest cons angle
   - If all content targets beginners → advanced user angle
   - If all content is listicles → deep single-product dive

4. **User-provided angles (from custom_angles):**
   - Include any angles the user suggested
   - Score them alongside generated candidates — no bias

For each angle, define:

```yaml
Angle:
  title: string               # Specific, could be an actual content title
  angle: string               # Brief description of the angle
  format: string              # "comparison" | "review" | "tutorial" | "listicle" | "demo" | "story" | "reaction" | "explainer"
  hook: string                # The actual hook/opening line
  hook_type: string           # "question" | "shock" | "bold_claim" | "demo_first" | "relatable" | "contrarian"
  source: string              # "gap" | "pattern" | "contrarian" | "user_provided"
```

### Step 3: Score Each Angle

Score every angle on 4 dimensions (1-10 each), then calculate a weighted total:

```
angle_score = (platform_fit × 0.25) + (competition_level × 0.30) +
              (engagement_prediction × 0.30) + (creator_fit × 0.15)
```

**Dimension 1: Platform Fit (weight: 25%)**

How well does this format/hook work on the target platform?

| Format | YouTube | TikTok | LinkedIn | X | Reddit | Blog |
|--------|---------|--------|----------|---|--------|------|
| comparison | 9 | 8 | 7 | 5 | 8 | 9 |
| review | 8 | 6 | 5 | 4 | 9 | 9 |
| tutorial | 9 | 7 | 6 | 3 | 7 | 10 |
| listicle | 7 | 8 | 9 | 8 | 6 | 8 |
| demo | 8 | 10 | 5 | 4 | 3 | 5 |
| story | 6 | 9 | 10 | 8 | 7 | 7 |
| reaction | 7 | 10 | 4 | 6 | 5 | 3 |
| explainer | 8 | 5 | 8 | 6 | 8 | 9 |

Adjust based on actual scout data if available (if comparisons outperform on a platform
where they usually don't, use the real data instead of the default table).

**Dimension 2: Competition Level (weight: 30%)**

How many similar content pieces already exist? Higher score = LESS competition.

```
IF scout data available:
  Count how many top_content pieces match this angle's format + similar topic
  10 = zero similar content found (blue ocean)
  7-9 = 1-3 similar pieces (low competition)
  4-6 = 4-10 similar pieces (moderate competition)
  1-3 = 10+ similar pieces (saturated)
  
IF no scout data:
  web_search for the exact angle title → count results
  Fewer results with exact match = higher score
```

**Dimension 3: Engagement Prediction (weight: 30%)**

How likely is this angle to get high engagement based on data?

```
IF scout data available:
  Look at engagement scores of similar formats and hooks in top_content
  If this angle's format has avg_engagement > median → higher score
  If this angle's hook_type has avg_engagement > median → higher score
  Combine: angle uses top format + top hook → 9-10
  Angle uses average format + average hook → 5-6
  Angle uses underperforming format → 3-4

IF no scout data:
  Use platform defaults and general engagement patterns
  Comparisons generally outperform reviews → 8 vs 6
  Bold claim hooks generally outperform questions → 8 vs 6
```

**Dimension 4: Creator Fit (weight: 15%)**

How well does this angle match the creator's strengths?

```
IF creator_strengths provided:
  "storytelling" → story format, relatable hooks → high fit
  "technical" → tutorial format, demo hooks → high fit
  "humor" → reaction format, relatable hooks → high fit
  "authority" → review format, bold claim hooks → high fit
  "visual" → demo format, demo_first hooks → high fit
  "data" → comparison format, explainer → high fit
  "personal_experience" → story format, reaction → high fit
  
  Match count: 2+ matches → 9-10, 1 match → 6-7, 0 matches → 4-5

IF no creator_strengths:
  Default all angles to 7 (neutral)
```

### Step 4: Rank and Add Difficulty/Time Estimates

Sort angles by `angle_score` descending.

For each angle, estimate:

```yaml
difficulty: string       # "easy" | "medium" | "hard"
estimated_time: string   # "30 min" | "1-2 hours" | "half day" | "full day"
```

Difficulty mapping:
- **easy:** Listicle, simple reaction, short demo, Twitter thread → 30-60 min
- **medium:** Comparison (need 2 products), tutorial with steps, story post → 1-3 hours
- **hard:** Deep review with testing, data-driven explainer, long-form video → 3+ hours

If `time_budget` is provided, flag angles that exceed the budget.

### Step 5: Self-Validation

Before presenting output, verify:

- [ ] At least 8 angles generated with concrete titles (not vague descriptions)
- [ ] Scores are differentiated (not all 7.0-7.5 — spread them out)
- [ ] Top angle is clearly justified by data, not arbitrary
- [ ] At least 2 gap-based angles included (differentiation opportunities)
- [ ] Difficulty estimates are realistic
- [ ] Next steps reference specific downstream skills with parameters

If any check fails, fix the output before delivering. Do not flag the checklist to the user.

## Output Schema

```yaml
output_schema_version: "1.0.0"
keyword: string
platform: string
data_source: string              # "trending-content-scout output" | "quick web_search scan"
angles_generated: number         # 8-12
top_angle:
  title: string
  angle: string
  format: string
  hook: string
  hook_type: string
  score: number
  why: string                    # data-backed reasoning
  difficulty: string
  estimated_time: string
all_angles:
  - title: string
    angle: string
    format: string
    hook: string
    hook_type: string
    platform_fit: number
    competition_level: number
    engagement_prediction: number
    creator_fit: number
    score: number
    difficulty: string
    estimated_time: string
    source: string               # "gap" | "pattern" | "contrarian" | "user_provided"
recommended_next_skill: string   # "viral-post-writer" | "tiktok-script-writer" | etc.
recommended_skill_params:        # ready-to-use parameters for the next skill
  format: string
  hook_style: string
  angle: string
```

## Output Format

```markdown
## Content Angle Ranker: [Keyword] on [Platform]

### Data Foundation
📊 Based on: [trending-content-scout output (20 pieces analyzed) | quick web_search scan]

---

### 🥇 #1 Recommended Angle — Score: [X.X]/10

**"[Specific Title]"**

| Dimension | Score | Evidence |
|-----------|-------|----------|
| Platform Fit | X/10 | [Format] works well on [Platform] — [data point] |
| Competition | X/10 | [Number] similar pieces exist — [assessment] |
| Engagement Prediction | X/10 | [Format] + [hook] averages [X] engagement in this niche |
| Creator Fit | X/10 | Matches your strengths in [X] |
| **Total** | **X.X/10** | |

- **Format:** [comparison] | **Hook:** [bold_claim]
- **Opening line:** "[Actual hook sentence]"
- **Difficulty:** [medium] | **Time:** [1-2 hours]
- **Why this wins:** [2-3 sentences of data-backed reasoning]

---

### 🥈 #2 — "[Title]" — Score: [X.X]/10
- Format: [X] | Hook: [X] | Competition: [X/10] | Time: [X]
- **Why:** [1 sentence]

### 🥉 #3 — "[Title]" — Score: [X.X]/10
- Format: [X] | Hook: [X] | Competition: [X/10] | Time: [X]
- **Why:** [1 sentence]

---

### All Angles Ranked

| # | Title | Format | Hook | Plat. Fit | Comp. | Eng. Pred. | Creator | Score | Time |
|---|-------|--------|------|-----------|-------|------------|---------|-------|------|
| 1 | ... | comparison | bold_claim | 9 | 8 | 9 | 8 | 8.7 | 2h |
| 2 | ... | demo | demo_first | 10 | 7 | 8 | 7 | 8.0 | 1h |
| 3 | ... | story | relatable | 9 | 6 | 7 | 9 | 7.5 | 1h |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

---

### ⚡ Quick Win vs Best Bet

| Strategy | Angle | Score | Time | Best For |
|----------|-------|-------|------|----------|
| **Quick Win** | [Easiest high-scoring angle] | X.X | 30min | "I want to ship something today" |
| **Best Bet** | [Highest scoring angle] | X.X | 2h | "I want the best possible content" |
| **Contrarian** | [Highest-scoring contrarian] | X.X | Xh | "I want to stand out from everyone" |

---

### 🚀 Next Steps

**To create Angle #1:**
```
Skill: [viral-post-writer | tiktok-script-writer | affiliate-blog-builder]
Parameters:
  product: [product name]
  format: [comparison]
  hook_style: [bold_claim]
  angle: "[specific angle description]"
  platform: [platform]
```

**Alternative paths:**
- `tiktok-script-writer` — for short-form video version of Angle #1
- `content-pillar-atomizer` — create a blog post, then atomize across all platforms
- `comparison-post-writer` — if the winning angle is a comparison
```

## Error Handling

- **No scout data and no keyword:** Ask user: "What topic or product are you creating content for? And which platform?"
- **Only 1 platform specified + limited data:** Generate angles anyway using platform-specific defaults. Note: *"Limited data available. Scores are based on general platform patterns. Run `trending-content-scout` first for data-backed scoring."*
- **All angles score similarly (within 0.5 points):** Spread them out by double-weighting the most differentiating dimension. Present as: *"These angles are closely matched. The tiebreaker is [competition/creator fit/etc.]."*
- **User's custom angles score low:** Still include them but be honest: *"Your angle '[X]' scored [X.X/10] — competition is high and the format doesn't match platform trends. Consider the #1 angle instead, or combine your angle with a [winning format]."*
- **Time budget too short for any good angle:** Recommend the easiest angle regardless of score, and flag: *"With [30 min], your best option is [quick angle]. For higher impact, allocate [2 hours] for [best angle]."*

## Examples

**Example 1:**
User: "I want to promote HeyGen on TikTok. What angle should I use?"
→ keyword: "HeyGen", platform: "tiktok"
→ Quick scout: web_search "HeyGen tiktok" → mostly demo-first content, 30-45s
→ Generate 10 angles: "HeyGen vs Synthesia comparison", "I made a $2000 video for free with HeyGen",
  "POV: your boss asks for a video and you use AI", "HeyGen for real estate agents", etc.
→ Top angle: "I replaced a $2000 video production with HeyGen" — Score: 8.7
  (bold_claim hook, demo format, low competition on TikTok, high engagement predicted)
→ Next: `tiktok-script-writer` with hook_style: bold_claim, duration: 45s

**Example 2:**
User: "Rank these content ideas for my YouTube channel about email marketing:
  1. ConvertKit vs Mailchimp comparison
  2. How I grew my list to 10K subscribers
  3. Top 5 email marketing mistakes"
→ platform: "youtube", custom_angles provided
→ Scout YouTube for email marketing content
→ Score all 3 + generate 5 additional angles
→ Result: "How I grew to 10K" scores highest (story format + bold_claim = 8.5)
  because competition for comparisons is saturated (score: 6.2) and listicles are average (7.1)
→ The user's story angle wins — with a suggested hook: "I went from 0 to 10K subscribers in 6 months. Here's what nobody tells you."

**Example 3:**
User: "I'm good at storytelling and humor. What should I create about AI writing tools on LinkedIn?"
→ creator_strengths: ["storytelling", "humor"], platform: "linkedin"
→ Generate angles weighted toward story format
→ Top: "I let AI write my LinkedIn posts for a week. My boss noticed." — Score: 9.1
  (story format, relatable hook, low competition on LinkedIn for this angle, perfect creator fit)

## Feedback & Issue Reporting

When this skill produces unexpected, incomplete, or incorrect output, generate a
`skill_feedback` block (see `shared/references/feedback-protocol.md` for full schema).

**Skill-specific failure modes:**
- **All angles score within 0.5 points:** Scoring not differentiated enough. Report as `wrong_output` with the scores.
- **Top angle is generic:** "Write a review of X" instead of a specific, titled angle. Report as `data_quality`.
- **Downstream skill can't use recommended_skill_params:** Schema mismatch. Report as `chain_break`.

**Auto-detect triggers:**
- Score range (max - min) < 1.0 across all angles
- <8 angles generated
- `recommended_skill_params` missing required fields for the suggested next skill

Report issues: [GitHub Issues](https://github.com/Affitor/affiliate-skills/issues/new?labels=skill-feedback&title=content-angle-ranker) | [Discussions](https://github.com/Affitor/affiliate-skills/discussions/categories/ideas)

## References

- `shared/references/social-data-providers.md` — API configuration and engagement score formula
- `shared/references/flywheel-connections.md` — master flywheel connection map
- `shared/references/platform-rules.md` — platform-specific content guidelines
- `shared/references/feedback-protocol.md` — issue detection and reporting standard

## Flywheel Connections

### Feeds Into
- `viral-post-writer` (S2) — recommended_angle with format, hook, and parameters
- `tiktok-script-writer` (S2) — TikTok-specific angle with duration and hook
- `twitter-thread-writer` (S2) — X-specific angle with hook
- `reddit-post-writer` (S2) — Reddit-specific angle with subreddit suggestion
- `affiliate-blog-builder` (S3) — blog angle with SEO keyword alignment
- `comparison-post-writer` (S3) — if winning angle is a comparison
- `content-pillar-atomizer` (S2) — angle as the pillar topic to atomize

### Fed By
- `trending-content-scout` (S1) — engagement data, patterns, gaps, benchmarks
- `niche-opportunity-finder` (S1) — niche context for angle generation
- `competitor-spy` (S1) — competitor gaps to exploit
- `performance-report` (S6) — historical angle performance data

### Feedback Loop
- S6 `performance-report` shows which angles actually performed → update scoring weights and format preferences for next run → content strategy improves with every cycle

```yaml
chain_metadata:
  skill_slug: "content-angle-ranker"
  stage: "research"
  timestamp: string
  suggested_next:
    - "viral-post-writer"
    - "tiktok-script-writer"
    - "affiliate-blog-builder"
```
