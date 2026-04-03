---
name: traffic-analyzer
description: >
  Analyze website traffic, global rank, engagement metrics, and traffic sources for any domain.
  Use this skill to evaluate affiliate program websites, compare competitor traffic,
  assess advertiser strength, or understand where an audience comes from. Triggers on:
  "analyze traffic for [domain]", "how much traffic does [site] get", "compare traffic
  between [site A] and [site B]", "is [program] worth promoting based on traffic",
  "traffic analysis", "website analytics for [domain]", "where does [site] get traffic",
  "check if [advertiser] is legit", "evaluate [program] website health", "SimilarWeb
  analysis", "traffic sources for [domain]", "how popular is [site]", "website rank",
  "domain authority check", "compare affiliate program websites".
license: MIT
version: "1.0.0"
tags: ["affiliate-marketing", "research", "traffic", "analytics", "competitor-analysis", "advertiser-evaluation"]
compatibility: "Claude Code, ChatGPT, Gemini CLI, Cursor, Windsurf, OpenClaw, any AI agent"
metadata:
  author: affitor
  version: "1.0"
  stage: S1-Research
---

# Traffic Analyzer

Analyze website traffic, engagement, and traffic sources for any domain. Goes beyond
raw data — scores the domain, interprets what the traffic patterns mean for affiliate
promotion, and recommends whether the program is worth your time.

A tool returns numbers. This skill returns a verdict.

**Use cases:**
- Is this affiliate program's website healthy? (High traffic = more brand awareness = easier conversions)
- Where does a competitor get their traffic? (Find channels they're ignoring)
- Compare 2-3 affiliate programs by advertiser website strength
- Validate a niche by checking traffic to the top programs in it

## Stage

This skill belongs to Stage S1: Research

## When to Use

- Before committing to promote an affiliate program — check if the advertiser is legit
- When comparing multiple programs — traffic is a proxy for brand strength
- When `competitor-spy` identifies competitor sites — analyze their traffic sources
- When evaluating a niche — check if the top programs have healthy traffic
- When an advertiser claims "millions of users" — verify with data

## Input Schema

```yaml
domains: string[]             # (required) 1-5 domains to analyze — "heygen.com", "synthesia.io"
compare: boolean              # (optional, default: true if 2+ domains) Side-by-side comparison
focus: string                 # (optional, default: "affiliate") 
                              # "affiliate" — score from promoter perspective
                              # "competitor" — analyze as a competitor site
                              # "advertiser" — evaluate advertiser health
```

## Workflow

### Step 1: Gather Traffic Data

**With SimilarWeb API (see `shared/references/social-data-providers.md`):**

If `social_data_config.similarweb` is configured:
- Call SimilarWeb API for each domain
- Returns: global rank, country rank, visits, pages/visit, avg duration, bounce rate, traffic sources

**Without API (web_search fallback):**

For each domain:
1. `web_search "[domain] traffic similarweb"` → often shows rank and visit estimates in snippets
2. `web_search "[domain] site traffic statistics"` → third-party reports
3. `web_search "site:[domain]"` → Google index count as proxy for content depth
4. `web_search "[domain] alexa rank"` OR `"[domain] semrush traffic"` → alternative sources
5. `web_fetch "https://www.similarweb.com/website/[domain]/"` → extract visible data from SimilarWeb free page (may be limited)

Note: web_search data is approximate. SimilarWeb API provides exact metrics.

### Step 2: Analyze Core Metrics

For each domain, analyze and interpret:

**Traffic Volume:**
```yaml
global_rank: number            # Lower = better. <10K = major site, <100K = solid, <1M = niche
country_rank: number           # Rank in primary country
monthly_visits: string         # "1.2M", "350K", "45K"
visits_trend: string           # "growing" | "stable" | "declining" (if historical data available)
```

**Engagement Quality:**
```yaml
pages_per_visit: number        # >3 = good engagement, <2 = bouncy
avg_visit_duration: string     # ">3 min" = engaged, "<1 min" = low quality
bounce_rate: number            # <40% = excellent, 40-60% = normal, >60% = concerning
```

**Traffic Sources Breakdown:**
```yaml
direct: number                 # % — brand strength indicator
search: number                 # % — SEO strength
social: number                 # % — social media presence
referral: number               # % — partnership/affiliate ecosystem
paid: number                   # % — ad spend (high paid = advertiser invests in acquisition)
```

### Step 3: Interpret for Use Case

**For affiliate promoters (`focus: "affiliate"`):**

Score the domain as an affiliate promotion target:

| Signal | Good (8-10) | OK (5-7) | Red Flag (1-4) |
|--------|-------------|----------|-----------------|
| Monthly visits | >500K | 50K-500K | <50K |
| Bounce rate | <40% | 40-60% | >70% |
| Search traffic | >30% | 15-30% | <10% (overly dependent on ads) |
| Brand (direct) | >30% | 15-30% | <10% (nobody knows them) |
| Pages/visit | >4 | 2-4 | <2 |

**Why this matters for affiliates:**
- High traffic = people already search for this brand → easier to convert your referrals
- Strong brand (high direct traffic) = trust → higher conversion rate
- Good engagement = product delivers value → lower refund rate → your commissions stick
- Healthy search traffic = sustainable business → long-term commission potential
- High paid traffic = advertiser invests in growth → good sign for program longevity

**For competitor analysis (`focus: "competitor"`):**

- Identify their strongest traffic channel → where are they winning?
- Find their weakest channel → opportunity for you
- Compare bounce rate → are they retaining visitors better than you?
- Check referral traffic → which sites link to them? (potential partnership targets)

**For advertiser evaluation (`focus: "advertiser"`):**

- Is the advertiser's website healthy? (declining traffic = risky to promote)
- Do they invest in marketing? (paid traffic % shows ad budget)
- Is their product sticky? (engagement metrics reveal product quality)
- How established are they? (global rank trajectory)

### Step 4: Generate Traffic Score

Calculate an overall **Traffic Health Score** (0-100):

```
traffic_score = (
  rank_score × 0.20 +           # Based on global rank
  volume_score × 0.25 +          # Based on monthly visits  
  engagement_score × 0.25 +      # Based on bounce rate + pages/visit + duration
  diversity_score × 0.15 +       # Traffic source diversity (not overly dependent on one channel)
  brand_score × 0.15             # Direct traffic % (brand recognition)
)
```

**Score interpretation:**
- **80-100:** Excellent. Strong, established brand. Safe to promote long-term.
- **60-79:** Good. Healthy traffic. Solid promotion candidate.
- **40-59:** Fair. Growing or niche site. Evaluate other factors (commission, product quality).
- **20-39:** Weak. Low traffic or declining. Proceed with caution.
- **0-19:** Red flag. Very low traffic, new, or declining fast. Not recommended unless early-stage with high commission.

### Step 5: Compare (if multiple domains)

If 2+ domains provided, create side-by-side comparison:
- Which has more traffic?
- Which has better engagement?
- Which has more diverse traffic sources?
- Which is growing faster?
- Overall winner with reasoning

### Step 6: Self-Validation

Before presenting output, verify:

- [ ] Data source clearly stated (API vs web_search estimate)
- [ ] Scores are calibrated (not all 8/10 — differentiate clearly)
- [ ] Interpretation matches the focus (affiliate vs competitor vs advertiser)
- [ ] Red flags explicitly called out, not buried
- [ ] Recommendation is actionable and specific

If any check fails, fix before delivering. Do not flag checklist to user.

## Output Schema

```yaml
output_schema_version: "1.0.0"
domains_analyzed:
  - domain: string
    data_source: "similarweb_api" | "web_search_estimate"
    metrics:
      global_rank: number | null
      country_rank: number | null
      country: string | null
      monthly_visits: string
      pages_per_visit: number | null
      avg_duration: string | null
      bounce_rate: number | null
    traffic_sources:
      direct: number | null        # percentage
      search: number | null
      social: number | null
      referral: number | null
      paid: number | null
    traffic_score: number          # 0-100
    verdict: string                # "excellent" | "good" | "fair" | "weak" | "red_flag"
    interpretation: string         # 2-3 sentence analysis based on focus
comparison: object | null          # if 2+ domains
  winner: string
  reasoning: string
recommended_next_skill: string
```

## Output Format

```markdown
## Traffic Analysis: [Domain(s)]

### Data Source
📊 **[SimilarWeb API | Web search estimates (approximate)]**

---

### [domain1.com] — Traffic Score: [XX]/100 — [Verdict]

| Metric | Value | Assessment |
|--------|-------|------------|
| Global Rank | #XX,XXX | [Good/Fair/Low] |
| Monthly Visits | X.XM | [High/Medium/Low] |
| Pages/Visit | X.X | [Engaged/Average/Bouncy] |
| Avg Duration | Xm Xs | [Good/Low] |
| Bounce Rate | XX% | [Healthy/Concerning/High] |

**Traffic Sources:**
```
Direct:   ██████████░░░░░░  35% (strong brand)
Search:   ████████░░░░░░░░  28% (good SEO)
Social:   ████░░░░░░░░░░░░  15% (social presence)
Referral: ███░░░░░░░░░░░░░  12% (affiliate ecosystem)
Paid:     ██░░░░░░░░░░░░░░  10% (moderate ad spend)
```

**What This Means for You:**
[2-3 sentences interpreting metrics for the user's focus — affiliate/competitor/advertiser]

---

### [If comparing 2+ domains]

### Head-to-Head: [domain1] vs [domain2]

| Metric | [domain1] | [domain2] | Winner |
|--------|-----------|-----------|--------|
| Traffic Score | XX/100 | XX/100 | [domain] |
| Monthly Visits | X.XM | XXK | [domain] |
| Engagement | X.X pg/visit | X.X pg/visit | [domain] |
| Brand Strength | XX% direct | XX% direct | [domain] |
| SEO | XX% search | XX% search | [domain] |

**Verdict:** [domain1] is the stronger affiliate promotion target because [reasoning].

---

### 🎯 Recommendation

[Specific, actionable recommendation based on focus]

### Next Steps
- `affiliate-program-search` — check commission details for [domain]
- `competitor-spy` — deep dive into their affiliate strategy
- `trending-content-scout` — find what content about [domain/product] is performing
```

## Error Handling

- **No API and web_search returns limited data:** Present what's available. Note: *"Limited data available via web search. For accurate metrics, configure SimilarWeb API — see `shared/references/social-data-providers.md`."* Still provide estimated score.
- **Domain not found / too new:** Note: *"[domain] has insufficient traffic data. This could mean: (1) very new site, (2) very low traffic, (3) data not yet indexed. This is itself useful information — proceed with caution."* Score: 10/100.
- **Domain is a subdomain:** Analyze the root domain instead. Note the adjustment.
- **More than 5 domains requested:** Analyze top 5, suggest running again for the rest.
- **SimilarWeb API rate limited:** Fall back to web_search for remaining domains.

## Examples

**Example 1:**
User: "Is HeyGen worth promoting? Check their traffic."
→ domain: "heygen.com", focus: "affiliate"
→ SimilarWeb or web_search → Global rank: ~15K, 2.1M monthly visits
→ Score: 82/100 — "Excellent. HeyGen has strong traffic with healthy engagement. 35% direct traffic shows strong brand recognition. Your referral links benefit from existing brand awareness."
→ Next: `affiliate-program-search` for HeyGen commission details

**Example 2:**
User: "Compare Notion vs ClickUp vs Monday.com traffic for my productivity niche"
→ domains: ["notion.so", "clickup.com", "monday.com"]
→ Analyze all 3, side-by-side comparison
→ Winner: Notion (highest traffic, best engagement)
→ But: ClickUp has highest referral % (12%) = strongest affiliate ecosystem → may convert better

**Example 3:**
User: "I found this small SaaS tool — screenpal.com. Is the advertiser legit?"
→ domain: "screenpal.com", focus: "advertiser"
→ Global rank: ~180K, ~300K monthly visits
→ Score: 55/100 — "Fair. Niche tool with moderate traffic. Growing steadily. Low paid traffic (2%) suggests bootstrapped. Engagement is good (3.8 pages/visit). Worth promoting if commission is strong, but don't expect brand-name conversion rates."

## Feedback & Issue Reporting

When this skill produces unexpected, incomplete, or incorrect output, generate a
`skill_feedback` block (see `shared/references/feedback-protocol.md` for full schema).

**Skill-specific failure modes:**
- **Domain not found in SimilarWeb:** Very new or very small site. Report as `data_quality`, note domain.
- **All metrics null from web_search:** No traffic data findable. Report as `data_quality`, severity: medium.
- **Traffic score seems wrong:** Score doesn't match known reality (e.g., Google.com scored 40/100). Report as `wrong_output`.

**Auto-detect triggers:**
- `traffic_score` is 0 or null for a well-known domain
- All `traffic_sources` percentages are null
- Comparison requested but only 1 domain returned data

Report issues: [GitHub Issues](https://github.com/Affitor/affiliate-skills/issues/new?labels=skill-feedback&title=traffic-analyzer) | [Discussions](https://github.com/Affitor/affiliate-skills/discussions/categories/ideas)

## References

- `shared/references/social-data-providers.md` — SimilarWeb API configuration
- `shared/references/flywheel-connections.md` — master flywheel connection map
- `shared/references/affiliate-glossary.md` — affiliate marketing terminology
- `shared/references/feedback-protocol.md` — issue detection and reporting standard

## Flywheel Connections

### Feeds Into
- `affiliate-program-search` (S1) — traffic score as program evaluation factor
- `competitor-spy` (S1) — traffic sources reveal competitor strategy
- `niche-opportunity-finder` (S1) — traffic data validates niche demand
- `content-angle-ranker` (S1) — traffic source breakdown informs platform prioritization
- `trending-content-scout` (S1) — social traffic % hints at which platforms to scout

### Fed By
- `competitor-spy` (S1) — competitor domains to analyze
- `affiliate-program-search` (S1) — program URLs to evaluate
- `niche-opportunity-finder` (S1) — top program domains in a niche

### Feedback Loop
- S6 `performance-report` shows your referral contribution to the advertiser → compare your traffic impact over time → prioritize programs where you move the needle

```yaml
chain_metadata:
  skill_slug: "traffic-analyzer"
  stage: "research"
  timestamp: string
  suggested_next:
    - "affiliate-program-search"
    - "competitor-spy"
    - "trending-content-scout"
```
