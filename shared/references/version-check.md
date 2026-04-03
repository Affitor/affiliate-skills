# Version Check & Update Notifications

How AI agents detect and notify users about affiliate-skills updates.

---

## The Problem

Users clone or fork affiliate-skills once and never update. New skills ship, bugs get
fixed, workflows improve — but users keep running the old version. The agent needs a
way to know "there's a newer version" and tell the user.

## How It Works

### 1. Local Version File

The repo ships with a `VERSION` file at the root:

```
1.2.0
```

This file is the single source of truth for the current installed version.

### 2. Remote Version Check

The agent checks the latest version from GitHub:

```bash
# Quick check — no auth needed, works everywhere
curl -s https://raw.githubusercontent.com/Affitor/affiliate-skills/main/VERSION
```

Or via the API:

```
GET https://list.affitor.com/api/v1/skills/version
→ { "version": "1.3.0", "released": "2026-04-10", "changelog_url": "..." }
```

### 3. Agent Behavior

**When to check:** At the START of any affiliate-skills session — when the agent first
detects it's using affiliate-skills (sees SKILL.md files, registry.json, or bootstrap prompt).

**Check logic (for the agent to follow):**

```
1. Read local VERSION file:
   - Claude Code / Pi: cat ~/.claude/skills/affiliate-skills/VERSION
   - Or: cat ./VERSION (if in project directory)
   - Or: check version from the bootstrap prompt metadata

2. Fetch remote version:
   - web_fetch "https://raw.githubusercontent.com/Affitor/affiliate-skills/main/VERSION"
   - Parse as semver string

3. Compare:
   IF remote > local → notify user
   IF remote == local → do nothing (silent)
   IF check fails (network error) → skip silently, don't block the session
```

**Notification format:**

For **minor/patch updates** (e.g., 1.2.0 → 1.2.1 or 1.3.0):
```
💡 affiliate-skills update available: v1.2.0 → v1.3.0
   New: [brief changelog line]
   Run: cd ~/.claude/skills/affiliate-skills && git pull
```

For **major updates** (e.g., 1.x → 2.0.0):
```
⚡ affiliate-skills major update: v1.2.0 → v2.0.0
   This update includes breaking changes. See changelog:
   https://github.com/Affitor/affiliate-skills/releases/tag/v2.0.0
   Run: cd ~/.claude/skills/affiliate-skills && git pull
```

**Rules:**
- Show notification ONCE per session, at the beginning
- Don't block the user — show notification and continue
- Never fail a skill because the version is old
- If version check fails (network error), skip silently

---

## For Maintainers: Release Checklist

When shipping a new version:

1. Update `VERSION` file with new semver
2. Update `registry.json` if skills were added/removed
3. Update `CHANGELOG.md` with what changed
4. Tag the release: `git tag v1.3.0 && git push --tags`
5. Create GitHub Release with changelog
6. (Optional) Update `list.affitor.com/api/v1/skills/version` endpoint

---

## For Agents: Implementation Guide

### Claude Code / Pi

Add to your CLAUDE.md or project instructions:

```markdown
## affiliate-skills Version Check

At the start of each session using affiliate-skills, run this check silently:

1. LOCAL=$(cat ~/.claude/skills/affiliate-skills/VERSION 2>/dev/null || echo "unknown")
2. REMOTE=$(curl -s https://raw.githubusercontent.com/Affitor/affiliate-skills/main/VERSION 2>/dev/null || echo "")
3. If REMOTE is not empty AND REMOTE != LOCAL, show a one-line update notification.
4. Continue with the user's request regardless of result.
```

### ChatGPT / Gemini / Any AI

When using the bootstrap prompt, the agent can check by including this in the system prompt:

```
Current affiliate-skills version: 1.2.0 (check VERSION file)
To check for updates: web_fetch https://raw.githubusercontent.com/Affitor/affiliate-skills/main/VERSION
If newer version exists, mention it once at the start of the conversation.
```

### Cursor / Windsurf

The `.cursorrules` file can include:

```
Check https://raw.githubusercontent.com/Affitor/affiliate-skills/main/VERSION
against local VERSION file. Notify if update available.
```

---

## CHANGELOG.md Format

```markdown
# Changelog

## [1.3.0] - 2026-04-15

### Added
- `trending-content-scout` (S1) — scan platforms for top content by engagement
- `content-angle-ranker` (S1) — rank angles by data
- `traffic-analyzer` (S1) — website traffic analysis
- `content-research-brief` (S2) — research-first content creation
- `infographic-generator` (S2) — branded infographic specs
- `social-data-providers.md` — API configuration reference
- `feedback-protocol.md` — standardized issue reporting

### Changed
- `competitor-spy` — added Step 2.5: Social Engagement Analysis
- `viral-post-writer` — added Step 2.5: Research Winning Formats
- `tiktok-script-writer` — added Step 1.5: Analyze Top Performers
- `content-pillar-atomizer` — added Step 1.5: Platform Performance Data
- README rewritten with flywheel explanation, upgraded demo, companion tools

### Fixed
- (none)
```

---

## FAQ

**Q: What if the user doesn't want update notifications?**
A: They can set `AFFITOR_SKIP_VERSION_CHECK=1` in env or add `skip_version_check: true` to their settings.

**Q: What if the user forked the repo?**
A: Version check compares against upstream (Affitor/affiliate-skills). Forks may diverge — that's expected. The notification says "upstream has a new version" not "you must update."

**Q: Does this send any data to Affitor?**
A: No. The check reads a public file from GitHub. No analytics, no tracking, no data sent anywhere.
