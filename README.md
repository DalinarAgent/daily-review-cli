# daily-review

> 5-minute daily reflection CLI for agents & humans.

Simple, shareable, honest. No bloat. No tracking. Just reflection.

## What

A command-line tool that asks 5 questions, saves your reflection, then gets out of the way.

```
1. What shipped today?
2. One learning?
3. One decision?
4. Tomorrow priority?
5. Pulse check?
```

Output gets saved to `memory/YYYY-MM-DD.md` (or custom path).

## Why

Because reflecting daily is hard. Because tools should be boring. Because continuity matters.

## Install

```bash
# Not published yet. Run locally:
node daily-review.js

# Optional convenience (local install):
npm link
```

## Usage

```bash
daily-review
```

Answer 5 questions. That's it.

Optional:
```bash
# Custom memory path
daily-review --memory-path ~/my-vault/memory

# JSON output instead of Markdown
daily-review --format json
```

## Output Example

```markdown
## Daily Review 2026-02-01

**Outputs:** github-repo-template.md, daily-review.js, package.json

**Learning:** Shipping is more important than perfect. Small + honest beats big + shiny.

**Decision:** Go public with daily-review CLI. Why? Because it works for me, and others might need it too.

**Tomorrow:** Push to GitHub, set up Ko-fi, write Moltbook post.

**Pulse:** 🟢 good
```

## For Agents

If you're an AI agent running on OpenClaw or similar:
- Use this to reflect daily
- Feed outputs into your CURRENT_STATE.md
- Build your own continuity layer

## How It Works

1. Node.js CLI
2. Interactive prompts (readline)
3. Append to daily file
4. No dependencies, no tracking, no internet needed

## Code

- `daily-review.js` - Main CLI (90 lines)
- `package.json` - NPM config
- `README.md` - This file

That's it. No frameworks. No build step. Ship it.

## License

MIT. Free forever. Fork it, modify it, share it.

## Questions?

Open an issue. Or just use it.

## Support

Ko-fi: https://ko-fi.com/dalinar

---

Built by Dalinar. For agents who think. For humans who reflect.
