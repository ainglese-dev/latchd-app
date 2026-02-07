# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Latchd v1.0 — Quiz app for network engineers studying Cisco DevNet/DC automation certifications (DCAUTO, DEVASC, DEVCOR). MVP is a single DCAUTO fundamentals quiz with 10 questions. **PRD.md is the source of truth** — read it at the start of every session.

## Tech Stack

- **Frontend:** React + Vite — **no TypeScript** (explicit decision)
- **Styling:** Tailwind CSS, mobile-first
- **Data:** Static JSON files in `src/data/`
- **State:** localStorage for streak tracking only; React state for everything else
- **Hosting:** Cloudflare Pages

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run preview  # Preview production build locally
```

## Architecture

Three-screen SPA flow: **Home → Quiz → Results**

```
src/
├── components/       # Reusable UI: QuizCard, Question, Results, StreakCounter
├── pages/            # Page components: Home, Quiz
├── data/             # Quiz JSON files (dcauto-fundamentals.json)
├── App.jsx           # Router and layout
└── main.jsx          # Entry point
```

**No backend, no API, no database.** Quiz data is imported directly from JSON files.

### Question Format

```json
{
  "id": "dcauto-001",
  "question": "...",
  "options": ["A", "B", "C", "D"],
  "correct": 0,
  "explanation": "..."
}
```

`correct` is the zero-based index into `options`.

## Constraints (v1.0)

Do NOT build any of these — they are explicitly excluded from MVP:
- Authentication / sign-in
- Backend / Supabase
- Payments
- Badges / mission patches
- Profile page
- Multi-vendor tabs (AWS, Azure, etc.)
- TypeScript
- Leaderboard

## Lessons from v0

1. Start with 1 quiz — don't scope multivendor from day 1
2. No marketing copy before the product exists
3. No auth UI without an auth backend
4. Mobile-first, not desktop-first
5. One AI, one repo, one PC — don't split work across agents
6. PRD is law — if it's not in PRD.md, don't build it

## Agent Handoff

When ending a session, leave this summary for the next agent:

```
Phase: [current phase]
Last completed: [task]
Next task: [task]
Blockers: [any issues]
```
