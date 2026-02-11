# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Latchd — Quiz app for network engineers studying Cisco certifications (CCST, CCNA, DEVASC, DCAUTO, DEVCOR, ENARSI). **PRD.md is the source of truth** — read it at the start of every session.

- v1.0: COMPLETED ✅ — Single DCAUTO quiz, deployed to Cloudflare Pages
- v1.1: COMPLETED ✅ — Exam/topic structure, 4 exams, 12 topics, email CTA
- v1.2: COMPLETED ✅ — Warm light theme, post-quiz CTA, SEO, CF Web Analytics
- v1.3: COMPLETED ✅ — Landing page, locked topics, 6 exams (added CCST/CCNA), Icons, badges, blueprint links
- v1.4: CURRENT — Free content expansion, debt cleanup, score history, question randomization

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

Five-screen SPA flow: **Landing → Home → Exam Detail → Quiz → Results**

```
src/
├── components/       # ExamCard, TopicCard, Question, Results, StreakCounter, EmailCTA, Icons
├── pages/            # Landing, Home, ExamDetail, Quiz
│   └── Landing.jsx   # Marketing landing page at /
├── data/
│   ├── exams.json    # Exam registry with topics (6 exams, 24 topics)
│   └── questions/    # Organized by exam/topic
│       ├── ccst/
│       ├── ccna/
│       ├── dcauto/
│       ├── devasc/
│       ├── devcor/
│       └── enarsi/
├── utils/
│   ├── questionLoader.js  # Dynamic imports for question files
│   └── useSEO.js          # Per-page title + canonical URL
├── App.jsx           # Router and layout
└── main.jsx          # Entry point
```

**No backend, no API, no database.** Quiz data is imported directly from JSON files.

### Routing

See "Routing (v1.3)" section below for current routes.

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

## v1.2 Theme Direction

Warm light theme inspired by Claude's aesthetic + subtle space personality:
- Background: cream/warm white (`#faf8f5` or similar) — NOT dark mode
- Cards: white with soft shadows — NOT hard borders
- Text: dark brown/charcoal — NOT pure black
- Accent: warm orange (softer than current `#f97316`)
- Space emojis (🚀 🛸 ⭐ 🌌) as subtle personality accents
- Typography: Inter stays, rounded and approachable feel
- Correct: green, Wrong: red (same logic, adjusted for light bg)

## Routing (v1.3)

```
/                              → Landing page (marketing)
/app                           → App Home (exam cards)
/app/exam/:examId              → ExamDetail (topic cards)
/app/exam/:examId/:topicId     → Quiz (questions)
```

Landing page is a separate page component. App routes all live under `/app`.

## Locked Topics

Topics in `exams.json` can have `"locked": true`. 12 topics locked (2 per exam). These show:
- Lock icon (🔒) instead of "Start Quiz" button
- Tooltip: "Premium — coming soon"
- No click action, no navigation
- Visual only — no auth, no paywall
- Content still accessible via direct URL (intentional — all content is free for now)
- Some locked topics lack question files (will 404 if URL-hacked)

## Score History (v1.4)

- Store last 3 scores per topic in localStorage
- Key: `latchd_scores_{examId}_{topicId}` → `[{score, total, date}]`
- Display on TopicCard: "Last: 8/10" or completion indicator
- Display on ExamDetail: attempted vs not-attempted topics

## Question Randomization (v1.4)

- Shuffle question order when starting a quiz
- Shuffle answer options per question
- Maintain correct answer tracking through shuffle
- Same questions, different order each attempt

## Constraints (v1.4)

Do NOT build any of these — they are explicitly excluded:
- Authentication / login
- Payment processing
- Backend / Supabase / D1
- Real premium gating (lock is visual only)
- Badges / mission patches
- Profile page
- TypeScript
- Leaderboard
- Real email capture backend (EmailCTA stays localStorage)

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
