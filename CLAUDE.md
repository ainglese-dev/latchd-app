# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Latchd — Quiz app for network engineers studying Cisco DevNet/DC automation certifications (DCAUTO, DEVASC, DEVCOR). **PRD.md is the source of truth** — read it at the start of every session.

- v1.0: COMPLETED ✅ — Single DCAUTO quiz, deployed to Cloudflare Pages
- v1.1: CURRENT — Exam/topic structure, more exams, email CTA

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

Four-screen SPA flow: **Home → Exam Detail → Quiz → Results**

```
src/
├── components/       # ExamCard, TopicCard, Question, Results, StreakCounter, EmailCTA
├── pages/            # Home, ExamDetail (NEW), Quiz
├── data/
│   ├── exams.json    # Exam registry with topics
│   └── questions/    # Organized by exam/topic
│       ├── dcauto/
│       ├── devasc/
│       └── devcor/
├── App.jsx           # Router and layout
└── main.jsx          # Entry point
```

**No backend, no API, no database.** Quiz data is imported directly from JSON files.

### Routing

```
/                          → Home (exam cards)
/exam/:examId              → ExamDetail (topic cards)
/exam/:examId/:topicId     → Quiz (questions)
```

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

## Constraints (v1.1)

Do NOT build any of these — they are explicitly excluded:
- Authentication / sign-in
- Backend / Supabase
- Payments
- Badges / mission patches
- Profile page
- TypeScript
- Leaderboard
- Question randomization across topics
- Progress tracking per topic (localStorage streak only)

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
