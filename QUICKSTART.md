# Quick Start Guide

Pick your AI platform and follow the steps. You'll be running affiliate marketing skills in under 5 minutes.

---

## Claude Code

Full integration with slash commands and the `affiliate-check` CLI tool.

**Requirements:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Git](https://git-scm.com/), [Bun](https://bun.sh/) v1.0+

**Steps:**

1. Open Claude Code and paste:

> Install affiliate-skills: run `git clone https://github.com/Affitor/affiliate-skills.git ~/.claude/skills/affiliate-skills && cd ~/.claude/skills/affiliate-skills && ./setup` then add an "affiliate-skills" section to CLAUDE.md that says to use `/affiliate-check` for all affiliate program lookups, and lists the available skills: 52 skills across 8 stages (research, content, blog, landing, distribution, analytics, automation, meta).

2. Claude Code auto-discovers all 52 skills from the `SKILL.md` files
3. Use naturally: *"Find me the best AI video affiliate program"* or *"Write a LinkedIn post about HeyGen"*

**What you get:** Slash commands, `affiliate-check` CLI with live data, automatic skill chaining.

---

## ChatGPT / GPT Projects

Works with ChatGPT Plus, Team, or Enterprise. No code required.

**Option A — Quick start (no install):**

1. Open ChatGPT
2. Copy the entire content of [`prompts/bootstrap.md`](prompts/bootstrap.md) (everything below the `---` line)
3. Paste it as your first message or add it to a GPT Project's instructions
4. Start prompting: *"Find me the best SaaS affiliate programs with recurring commission"*

**Option B — Custom GPT:**

1. Go to [ChatGPT → Create a GPT](https://chatgpt.com/gpts/editor)
2. In **Instructions**, paste the content of [`prompts/bootstrap.md`](prompts/bootstrap.md)
3. Enable **Web Browsing** (so it can call the API and browse openaffiliate.dev)
4. Optionally upload [`registry.json`](registry.json) and [`API.md`](API.md) as knowledge files
5. Save and share with your team

**Option C — Upload the repo:**

1. Download this repo as a ZIP from GitHub
2. In a ChatGPT conversation, upload the ZIP or individual SKILL.md files you need
3. Say: *"Use these skill files to help me with affiliate marketing"*

---

## Cursor / Windsurf / AI Code Editors

Skills auto-activate when you open the repo.

**Steps:**

1. Clone the repo into your project:
   ```bash
   git clone https://github.com/Affitor/affiliate-skills.git
   ```
2. Open the folder in Cursor — it reads `.cursorrules` automatically
3. For Windsurf, the SKILL.md files work as context when referenced
4. Start prompting in the AI chat: *"Search for affiliate programs in the AI niche"*

**Tip:** For the `affiliate-check` CLI, run `cd affiliate-skills && ./setup` in the terminal first.

---

## Gemini

Works with Gemini Advanced (file upload) or Google AI Studio.

**Option A — Quick start:**

1. Open [Gemini](https://gemini.google.com)
2. Copy the content of [`prompts/bootstrap.md`](prompts/bootstrap.md) and paste as your first message
3. Start prompting

**Option B — With full context:**

1. Upload these files to a Gemini conversation:
   - `prompts/bootstrap.md` — core instructions
   - `API.md` — API reference
   - `registry.json` — skill index
   - Any specific `SKILL.md` files for skills you want to use
2. Say: *"You are my affiliate marketing agent. Use these files as your instructions."*

**Note:** Gemini can browse the web, so API calls to openaffiliate.dev work directly.

---

## Any Other AI (Universal Method)

Works with any AI that accepts text input — OpenClaw, Perplexity, Mistral, local models, or custom agent frameworks.

**Steps:**

1. Open [`prompts/bootstrap.md`](prompts/bootstrap.md)
2. Copy everything below the `---` line
3. Paste it into your AI as the system prompt or first message
4. Start with: *"Search for the best affiliate programs for [your niche]"*

**For AI agents with HTTP access:** The bootstrap prompt includes API details. The AI will call `openaffiliate.dev/api/programs` directly. No API key needed — the API is fully public.

**For AI without HTTP access:** Ask the AI to generate the search URL, visit it yourself, and paste the JSON response back.

**For developers building agent pipelines:**
- Use [`registry.json`](registry.json) as a machine-readable skill index
- Each skill's `SKILL.md` has typed Input/Output schemas for structured data exchange
- See [`API.md`](API.md) for endpoint documentation
- Skills in `agents/openai.yaml` format are available for OpenAI-compatible tool definitions

---

## Without Installing Anything

Want to try before you commit? Paste this into any AI right now:

```
Search the Affitor affiliate directory for AI video tools.
Use this API: GET https://openaffiliate.dev/api/programs?q=AI+video&sort=relevance&limit=5
Show me the results in a table with: Name, Reward Value, Cookie Days, Stars.
Then recommend the best one and explain why.
```

No API key needed. The API is fully public and open.

---

## Next Steps

- Browse programs: [openaffiliate.dev](https://openaffiliate.dev)
- Full skill reference: [README.md](README.md)
- API documentation: [API.md](API.md)
- Contribute a skill: [CONTRIBUTING.md](CONTRIBUTING.md)
