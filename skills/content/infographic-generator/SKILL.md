---
name: infographic-generator
description: >
  Generate branded infographic specifications from any content or data. Outputs structured
  layout, copy, data visualization, and color scheme — ready to render as HTML/CSS,
  Satori, Canva, or any design tool. Use this skill when the user wants an infographic,
  data visual, social media image, comparison chart, stat card, or says "create an
  infographic for [content]", "make a visual for my LinkedIn post", "design an image
  for [topic]", "stat graphic for [data]", "comparison infographic", "branded image",
  "social media graphic", "infographic for [blog post]", "data visualization",
  "visual content", "image for my post", "LinkedIn carousel image", "feature comparison
  chart", "pricing table image".
license: MIT
version: "1.0.0"
tags: ["affiliate-marketing", "content-creation", "infographic", "visual", "design", "branded"]
compatibility: "Claude Code, ChatGPT, Gemini CLI, Cursor, Windsurf, OpenClaw, any AI agent"
metadata:
  author: affitor
  version: "1.0"
  stage: S2-Content
---

# Infographic Generator

Generate complete infographic specifications from any content, data, or topic.
Outputs structured layout + all copy + data points + color scheme — ready to render
as HTML/CSS, with [Satori](https://github.com/vercel/satori) (server-side), in Canva,
Figma, or any design tool.

**LinkedIn posts with images get 2-3x more engagement.** This skill turns your content
into visual assets without design skills.

Inspired by [content-pipeline](https://github.com/Affitor/content-pipeline)'s Satori
rendering: AI writes the content → structured spec → rendered as a branded image.

## Stage

This skill belongs to Stage S2: Content

## When to Use

- After `viral-post-writer` creates a LinkedIn post — add a visual
- After `content-research-brief` collects stats — visualize them
- When creating comparison content — feature/pricing comparison chart
- When sharing data or stats — stat highlight cards
- When creating a listicle — visual checklist or numbered list
- For any social media post that would benefit from a branded image

## Input Schema

```yaml
content: string                # (required) Content to visualize — post text, data, or article
infographic_type: string       # (optional, default: auto-detected)
                               # "stat_highlight" — 1-3 key numbers, large and bold
                               # "comparison" — side-by-side product/feature comparison
                               # "process_flow" — step-by-step workflow or how-to
                               # "checklist" — list of items with checkmarks
                               # "timeline" — chronological events
                               # "data_chart" — bar/pie chart representation
                               # "quote_card" — featured quote with attribution
                               # "feature_grid" — grid of features/benefits with icons
platform: string               # (optional, default: "linkedin")
                               # "linkedin" — 1080×1350 (portrait, optimal engagement)
                               # "instagram" — 1080×1080 (square)
                               # "twitter" — 1200×675 (landscape)
                               # "facebook" — 1200×630
                               # "blog" — 1200×800 (featured image)
brand: object                  # (optional) Brand customization
  name: string                 # Company/personal brand name
  primary_color: string        # Hex — "#0066FF"
  secondary_color: string      # Hex — "#1A1A2E"
  accent_color: string         # Hex — "#FF6B35"
  font_style: string           # "modern" | "classic" | "bold" | "minimal"
  logo_text: string            # Text-based logo — "Affitor" | "@yourhandle"
output_format: string          # (optional, default: "spec")
                               # "spec" — structured JSON spec (for any renderer)
                               # "html" — renderable HTML/CSS (self-contained)
                               # "both" — spec + HTML
```

## Workflow

### Step 1: Analyze Content and Select Type

Read the input content and detect the best infographic type:

| Content Pattern | Auto-detected Type |
|----------------|-------------------|
| Contains 1-3 prominent numbers/stats | `stat_highlight` |
| Contains "vs", comparison data | `comparison` |
| Contains numbered steps or a process | `process_flow` |
| Contains a list of items (3-10) | `checklist` or `feature_grid` |
| Contains dates or chronological events | `timeline` |
| Contains a notable quote | `quote_card` |
| Contains percentages or proportions | `data_chart` |

If `infographic_type` is provided, use that. Otherwise auto-detect.

### Step 2: Extract Visual Data

From the content, extract exactly what needs to appear in the infographic:

**For `stat_highlight`:**
```yaml
stats:
  - number: "30%"        # The big number
    label: "commission"   # What it measures
    context: "recurring"  # Additional context
  - number: "60"
    label: "cookie days"
    context: "industry avg: 30"
```

**For `comparison`:**
```yaml
items:
  - name: "HeyGen"
    features:
      - label: "Commission"
        value: "30% recurring"
        highlight: true         # winner for this row
      - label: "Cookie"
        value: "60 days"
        highlight: true
  - name: "Synthesia"
    features:
      - label: "Commission"
        value: "25% one-time"
        highlight: false
      - label: "Cookie"
        value: "30 days"
        highlight: false
```

**For `process_flow`:**
```yaml
steps:
  - number: 1
    title: "Research"
    description: "Find winning programs"
    icon: "🔍"
  - number: 2
    title: "Create"
    description: "Write content that converts"
    icon: "✍️"
```

**For `checklist`:**
```yaml
items:
  - text: "Recurring commission"
    checked: true
  - text: "60+ day cookie"
    checked: true
  - text: "Free trial available"
    checked: true
  - text: "Dedicated affiliate manager"
    checked: false
```

### Step 3: Design Layout

Based on type + platform, define the layout:

**Platform dimensions:**
| Platform | Width | Height | Aspect |
|----------|-------|--------|--------|
| LinkedIn | 1080 | 1350 | 4:5 (portrait) |
| Instagram | 1080 | 1080 | 1:1 (square) |
| Twitter | 1200 | 675 | 16:9 (landscape) |
| Facebook | 1200 | 630 | ~2:1 |
| Blog | 1200 | 800 | 3:2 |

**Layout structure (all types):**
```
┌─────────────────────────────┐
│         HEADER              │  10-15% height
│    Headline / Title         │
├─────────────────────────────┤
│                             │
│         BODY                │  70-80% height
│    Data / Content           │
│    (type-specific layout)   │
│                             │
├─────────────────────────────┤
│         FOOTER              │  10% height
│    Brand / CTA / Source     │
└─────────────────────────────┘
```

### Step 4: Generate Color Scheme

**If brand colors provided:** Use them directly.

**If no brand colors:** Generate a professional palette:

```yaml
# Default professional palette options
palettes:
  dark_modern:       # Dark background, light text
    bg: "#1A1A2E"
    text: "#FFFFFF"
    accent: "#0066FF"
    secondary: "#16213E"
    
  light_clean:       # Light background, dark text
    bg: "#FFFFFF"
    text: "#1A1A2E"
    accent: "#0066FF"
    secondary: "#F0F4F8"
    
  warm_bold:         # Warm tones
    bg: "#FFF8F0"
    text: "#2D2D2D"
    accent: "#FF6B35"
    secondary: "#FFE8D6"
    
  dark_gradient:     # Gradient dark
    bg: "linear-gradient(135deg, #1A1A2E, #16213E)"
    text: "#FFFFFF"
    accent: "#00D4AA"
    secondary: "#2A2A4A"
```

Auto-select based on platform:
- LinkedIn → `dark_modern` or `light_clean` (professional)
- Twitter → `dark_gradient` or `warm_bold` (attention-grabbing)
- Instagram → Any (most visual flexibility)

### Step 5: Generate All Copy

Write every piece of text that appears in the infographic:

```yaml
copy:
  headline: string          # Main title — bold, short (max 8 words)
  subheadline: string       # Optional supporting line
  body_items: string[]      # Data labels, descriptions, etc.
  cta: string               # Call-to-action text — "Link in bio" | "See comments for link"
  footer: string            # Brand name or @handle
  source: string            # "Data: list.affitor.com" or source attribution
```

**Copy rules:**
- Headlines: 3-8 words, bold claim or specific number
- All text must be readable at mobile scale (not too small)
- No more than 50 total words on the infographic (less = better)
- Data > adjectives (show numbers, not "amazing" or "incredible")

### Step 6: Output

**Spec output (default):**

Complete structured spec that any renderer can consume:

```yaml
infographic_spec:
  type: string
  platform: string
  dimensions:
    width: number
    height: number
  colors:
    background: string
    text: string
    accent: string
    secondary: string
  layout:
    header: object
    body: object
    footer: object
  data: object              # Type-specific data (stats, comparison items, steps, etc.)
  copy:
    headline: string
    subheadline: string
    body_items: string[]
    cta: string
    footer: string
    source: string
```

**HTML output (if `output_format` is "html" or "both"):**

Generate a self-contained HTML file with inline CSS that renders the infographic
at exact dimensions. This can be:
- Opened in a browser and screenshotted
- Rendered server-side with Satori or Puppeteer
- Used as a starting point for design iteration

```html
<!-- Self-contained, no external dependencies -->
<div style="width: 1080px; height: 1350px; ...">
  <!-- Header -->
  <!-- Body (type-specific) -->
  <!-- Footer -->
</div>
```

### Step 7: Self-Validation

Before presenting output, verify:

- [ ] Total word count on infographic ≤ 50 words
- [ ] All text readable at 50% zoom (minimum effective font size)
- [ ] Color contrast meets accessibility (WCAG AA: 4.5:1 ratio)
- [ ] Data points are accurate and attributed
- [ ] Layout doesn't feel cramped — whitespace is intentional
- [ ] Platform dimensions are correct

If any check fails, fix before delivering.

## Output Format

```markdown
## Infographic: [Headline]

### Spec
- **Type:** [stat_highlight]
- **Platform:** [LinkedIn] — 1080×1350
- **Colors:** [dark_modern] — bg: #1A1A2E, accent: #0066FF

### Preview (text representation)

┌─────────────────────────────────┐
│                                 │
│     HeyGen vs Synthesia         │
│     The Real Comparison         │
│                                 │
│  ┌──────────┐  ┌──────────┐    │
│  │  HeyGen  │  │Synthesia │    │
│  │          │  │          │    │
│  │ 30% rec. │  │ 25% once │    │
│  │ 60 days  │  │ 30 days  │    │
│  │ ★ 127    │  │ ★ 84     │    │
│  └──────────┘  └──────────┘    │
│                                 │
│     🏆 Winner: HeyGen           │
│                                 │
│  ───────────────────────────    │
│  @yourhandle · list.affitor.com │
└─────────────────────────────────┘

### Data

[Structured spec as YAML or JSON]

### HTML (if requested)

[Self-contained HTML/CSS code block]

### Next Steps
- Post to [platform] with your viral post from `viral-post-writer`
- Create variations for other platforms: `--platform instagram`
- Generate more infographics from different data in your `content-research-brief`
```

## Error Handling

- **Content has no extractable data:** Generate a `quote_card` or `checklist` type instead. Note: *"No numerical data found. Created a [type] infographic instead."*
- **Too much data for one infographic:** Select top 3-5 most impactful data points. Note: *"Content has [X] data points. Selected the [Y] most impactful for visual clarity. Consider creating multiple infographics."*
- **No brand colors:** Use default palette. Note: *"No brand colors specified. Using [palette name]. Add brand colors for consistent branding."*
- **HTML output too complex:** Simplify layout. Infographics should be simple — complexity kills visual impact.

## Examples

**Example 1:**
User: "Make an infographic comparing HeyGen vs Synthesia for LinkedIn"
→ type: comparison, platform: linkedin (1080×1350)
→ Extract: commission, cookie, rating, price for each
→ Output: side-by-side comparison card with winner highlighted
→ Dark modern palette, bold numbers

**Example 2:**
User: "Create a stat card from my research brief showing HeyGen's key numbers"
→ type: stat_highlight, platform: linkedin
→ Extract: "$60M raised", "40K businesses", "30% commission"
→ Output: 3 large numbers with labels and context

**Example 3:**
User: "Visualize the affiliate funnel steps as an infographic"
→ type: process_flow, platform: blog (1200×800)
→ Steps: Research → Content → Landing → Deploy → Track → Optimize
→ Output: horizontal flow with icons and brief descriptions

## Feedback & Issue Reporting

When this skill produces unexpected, incomplete, or incorrect output, generate a
`skill_feedback` block (see `shared/references/feedback-protocol.md` for full schema).

**Skill-specific failure modes:**
- **No extractable data from content:** Content is purely narrative, no stats/numbers. Report as `data_quality`.
- **HTML output doesn't render correctly:** CSS issues, wrong dimensions, text overflow. Report as `wrong_output` with the HTML.
- **Too many words on infographic:** >50 words makes it unreadable. Report as `wrong_output`.

**Auto-detect triggers:**
- `infographic_spec.data` has <2 data points
- Total word count in all copy fields > 60
- Dimensions don't match declared platform

Report issues: [GitHub Issues](https://github.com/Affitor/affiliate-skills/issues/new?labels=skill-feedback&title=infographic-generator) | [Discussions](https://github.com/Affitor/affiliate-skills/discussions/categories/ideas)

## References

- `shared/references/social-data-providers.md` — data sources for infographic content
- `shared/references/platform-rules.md` — platform-specific image requirements
- `shared/references/flywheel-connections.md` — master flywheel connection map
- `shared/references/feedback-protocol.md` — issue detection and reporting standard

## Flywheel Connections

### Feeds Into
- `social-media-scheduler` (S5) — infographic ready to schedule with post
- `landing-page-creator` (S4) — infographic as hero image or section visual
- `email-drip-sequence` (S5) — infographic as email visual content
- `bio-link-deployer` (S5) — infographic in link hub

### Fed By
- `content-research-brief` (S2) — key stats and data for visualization
- `viral-post-writer` (S2) — post content to create accompanying visual
- `affiliate-blog-builder` (S3) — blog data for featured image infographic
- `trending-content-scout` (S1) — engagement data for benchmark visuals
- `traffic-analyzer` (S1) — traffic data for comparison infographics
- `comparison-post-writer` (S3) — comparison data for visual format
- `commission-calculator` (S1) — commission data for stat highlights

### Feedback Loop
- S6 posts with infographics vs without → `performance-report` shows engagement lift → prioritize infographic creation for high-value content

## Quality Gate

Before delivering output, verify:

1. Would I stop scrolling for this image?
2. Can I understand the main point in under 3 seconds?
3. Is the data accurate and attributed?
4. Does it look professional, not like clip art?
5. Is it readable on a phone screen?

Any NO → redesign before delivering.

```yaml
chain_metadata:
  skill_slug: "infographic-generator"
  stage: "content"
  timestamp: string
  suggested_next:
    - "social-media-scheduler"
    - "viral-post-writer"
    - "landing-page-creator"
```
