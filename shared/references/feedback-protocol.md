# Feedback Protocol

Standard for detecting, reporting, and learning from skill execution issues.
Referenced by: every SKILL.md via the `## Feedback & Issue Reporting` section.

---

## Why This Exists

Skills are Markdown instructions — they can't self-correct across sessions. Without a
feedback loop, the same bug hits every user independently and never gets fixed.

This protocol creates a standard way to:
1. **Detect** when a skill underperforms (auto-triggers)
2. **Report** what went wrong (structured schema)
3. **Route** to the right fix path (conversation → GitHub Issue → skill update)
4. **Track** patterns (which skills fail most, at which step, on which platform)

---

## Auto-Detection Triggers

An agent **SHOULD** generate `skill_feedback` when any of these occur:

| Trigger | Severity | Example |
|---------|----------|---------|
| Self-Validation checklist has ≥1 failure | medium | "Engagement scores not calculated — only views available" |
| Output schema has >30% null/empty fields | medium | Research brief with 2/7 sources fetched |
| API call fails AND fallback produces limited data | low | SimilarWeb unavailable, web_search estimate used |
| User says "this is wrong" or explicitly rejects output | high | User corrects a hallucinated stat |
| Downstream skill cannot parse or find expected data in context | high | viral-post-writer can't find `recommended_angle` |
| Same skill fails 2+ times in one session | critical | trending-content-scout returns empty for multiple keywords |
| Agent had to skip an entire workflow step | medium | No API configured, entire Step 2.5 skipped |
| Output contradicts input data | critical | Scout says "comparison wins" but writer outputs a listicle |
| Hallucination detected (data not from any source) | critical | Made-up engagement score or fabricated URL |

**When NOT to generate feedback:**
- Skill ran successfully with full data → no feedback needed
- Minor formatting differences → not a bug
- User asks for a different approach (preference, not failure) → not a bug

---

## Feedback Schema

When a trigger is detected, append this block to the skill output:

```yaml
skill_feedback:
  skill: string                # skill slug — "trending-content-scout"
  version: string              # from SKILL.md frontmatter — "1.0.0"
  status: string               # "success" | "partial_failure" | "failure"
  issue_type: string           # see taxonomy below
  step_failed: string | null   # "Step 1", "Step 2.5", "Self-Validation" — null if general
  description: string          # what went wrong — be specific
  workaround_used: string      # what the agent did instead — "Used web_search fallback"
  severity: string             # "low" | "medium" | "high" | "critical"
  suggestion: string           # how to fix the skill — actionable
  context:
    platform: string           # "claude_code" | "pi" | "chatgpt" | "gemini" | "cursor" | "other"
    had_api: boolean           # was social_data_config or API configured?
    data_source: string        # "api" | "web_search" | "mixed" | "none"
    keyword: string            # the keyword/topic that triggered the issue (if applicable)
```

### Example

```yaml
skill_feedback:
  skill: "trending-content-scout"
  version: "1.0.0"
  status: "partial_failure"
  issue_type: "data_quality"
  step_failed: "Step 2"
  description: "TikTok search returned 0 results for keyword 'email marketing tools'. YouTube returned 12 results. Engagement scores only calculated for YouTube."
  workaround_used: "Skipped TikTok platform. Noted limitation in output. Pattern analysis based on YouTube only."
  severity: "low"
  suggestion: "Add alternative TikTok search queries: try '[keyword] tiktok viral' and '[keyword] #tiktok' as fallback searches."
  context:
    platform: "claude_code"
    had_api: false
    data_source: "web_search"
    keyword: "email marketing tools"
```

---

## Issue Type Taxonomy

| Type | Meaning | Common Causes | Typical Fix |
|------|---------|--------------|-------------|
| `data_quality` | Data retrieved was incomplete/inaccurate | API rate limit, web_search limited results, paywalled sources | Add fallback queries, broaden search |
| `missing_step` | Workflow step couldn't execute | Missing dependency data, no API configured | Make step more resilient, better fallback |
| `wrong_output` | Output contains incorrect information | Stale data, incorrect calculation, wrong URL | Fix formula, add validation |
| `schema_mismatch` | Output doesn't match declared schema | Missing required fields, wrong data types | Align output generation with schema |
| `api_error` | API call failed | Rate limit, auth error, endpoint changed | Add retry, update endpoint, document error |
| `hallucination` | Agent generated data not from real sources | No sources found, model filled in gaps | Add explicit "do not fabricate" instruction |
| `chain_break` | Output couldn't be consumed by next skill | Schema changed, field renamed, data format mismatch | Align output/input schemas between skills |
| `stale_content` | Skill references outdated information | API endpoints changed, platform rules updated | Version bump with updated references |
| `other` | Doesn't fit above categories | — | Describe in detail |

---

## Severity Levels

| Severity | Meaning | Action |
|----------|---------|--------|
| **low** | Skill completed but with reduced quality | Note in output. No immediate action needed. |
| **medium** | Skill completed but missing significant data | Note in output. Suggest user configure API or retry. |
| **high** | Skill output may be misleading or incorrect | Warn user explicitly. Suggest filing GitHub Issue. |
| **critical** | Skill failed or produced wrong results | Stop and tell user. Auto-suggest GitHub Issue link. |

---

## Where Feedback Goes

### 1. In Conversation (always)

Every `skill_feedback` block is appended to the skill output so the user sees it.
For `low` severity: small note at the bottom.
For `high`/`critical`: prominent warning before the main output.

### 2. GitHub Issue (high/critical)

When severity is `high` or `critical`, the agent should suggest:

```
⚠️ This skill encountered an issue. Help improve it:
→ File an issue: https://github.com/Affitor/affiliate-skills/issues/new?labels=skill-feedback&title=[skill-slug]+[issue_type]
→ Or discuss: https://github.com/Affitor/affiliate-skills/discussions/categories/ideas
```

### 3. Discussion (low/medium patterns)

When the same `low`/`medium` issue occurs repeatedly across sessions, suggest posting
in Discussions so the community can validate and prioritize.

### 4. Skill Update Cycle

When an issue is fixed:
1. Update the SKILL.md workflow/error handling
2. Bump `version` in frontmatter (patch for fixes, minor for new steps)
3. Note the fix in the PR description
4. The `skill_feedback.version` field lets users check if they're on the fixed version

---

## For Skill Authors

When writing a new skill, include the `## Feedback & Issue Reporting` section
(see `template/SKILL.md`). This section is SHORT — it points to this protocol doc
for details, so you don't repeat the full schema in every skill.

### Minimum requirements:
1. List 2-3 **skill-specific** failure modes (beyond the generic ones above)
2. Include the GitHub Issue link with pre-filled labels
3. Reference this protocol doc

---

## Version Checking

Skills include a `version` field in frontmatter. The feedback schema includes `version`
so issues can be correlated with specific skill versions. When a fix ships:

```yaml
# Before fix
version: "1.0.0"

# After fix
version: "1.0.1"  # patch — bug fix
version: "1.1.0"  # minor — new step or capability added
version: "2.0.0"  # major — breaking schema change
```

See `shared/references/version-check.md` for the repo-level version notification system.
