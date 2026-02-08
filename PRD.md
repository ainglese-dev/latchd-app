# Latchd — PRD

> Single source of truth. Reference this at the start of every AI session.

## Vision

Quiz app for network engineers studying DevNet/DC automation certifications. That's it.

## Target User

Network engineer students preparing for Cisco DevNet exams (DCAUTO, DEVASC, DEVCOR).

## v1.0 — COMPLETED ✅

- 1 quiz: DCAUTO fundamentals, 10 questions
- 3 screens: Home → Quiz → Results
- No auth, no backend, no payments
- JSON quiz data, localStorage streak
- Deployed: https://latchd-app.angel-inglese.workers.dev/

## v1.1 — CURRENT

### Goals
1. Restructure data for multiple exams with topics/subtopics
2. Add DEVASC and DEVCOR exams
3. Simple email CTA for updates (no auth)

### New Features

**Exam → Topic structure:**
- Home shows exam cards (DCAUTO, DEVASC, DEVCOR)
- Click exam → see topics within that exam
- Click topic → take quiz (10 questions per topic)

**More content:**
- DCAUTO: split current questions into topics + add more
- DEVASC: REST APIs, Python basics, Git, CI/CD
- DEVCOR: start with 1-2 topics

**Email CTA:**
- Simple "Get notified when new exams drop" on Home
- Buttondown or Cloudflare Worker + KV
- No auth, no accounts — just email capture

### New Screens

**Home (updated)**
- Streak counter
- Exam cards: name, topic count, question count, "Explore" button

**Exam Detail (NEW)**
- Exam name + description
- Topic cards: name, question count, "Start Quiz" button
- Back to Home link

**Quiz (same)**
- Progress bar, question, 4 options, feedback, next

**Results (same)**
- Score, pass/fail, review, retry/home buttons

## Stack

| Layer | Choice |
|-------|--------|
| Frontend | React + Vite (no TypeScript) |
| Styling | Tailwind CSS |
| Data | Local JSON files |
| State | localStorage (streak only) |
| Hosting | Cloudflare Pages |
| Domain | latchd.com (later) |

## NOT in v1.1

- No auth / Sign In
- No Supabase or backend DB
- No payments / Lemon Squeezy
- No badges / mission patches
- No profile page
- No TypeScript
- No leaderboard
- No question randomization across topics
- No progress tracking per topic (localStorage streak only)

## Data Structure (v1.1)

### Exam registry

```json
// src/data/exams.json
[
  {
    "id": "dcauto",
    "name": "DCAUTO 300-635",
    "description": "Automating and Programming Cisco Data Center Solutions",
    "topics": [
      { "id": "network-programmability", "name": "Network Programmability", "file": "dcauto/network-programmability.json" },
      { "id": "aci-programmability", "name": "ACI Programmability", "file": "dcauto/aci-programmability.json" },
      { "id": "nxos-automation", "name": "NX-OS Automation", "file": "dcauto/nxos-automation.json" }
    ]
  }
]
```

### Question format (unchanged)

```json
{
  "id": "dcauto-np-001",
  "question": "...",
  "options": ["A", "B", "C", "D"],
  "correct": 0,
  "explanation": "..."
}
```

### File structure

```
src/
├── components/
│   ├── ExamCard.jsx        # NEW — exam card for home
│   ├── TopicCard.jsx       # NEW — topic card for exam detail
│   ├── Question.jsx        # existing
│   ├── Results.jsx         # existing
│   ├── StreakCounter.jsx   # existing
│   └── EmailCTA.jsx        # NEW — email capture
├── data/
│   ├── exams.json          # NEW — exam registry
│   └── questions/          # NEW — organized by exam
│       ├── dcauto/
│       │   ├── network-programmability.json
│       │   ├── aci-programmability.json
│       │   └── nxos-automation.json
│       ├── devasc/
│       │   └── ...
│       └── devcor/
│           └── ...
├── pages/
│   ├── Home.jsx            # updated
│   ├── ExamDetail.jsx      # NEW
│   └── Quiz.jsx            # updated (loads topic file)
├── App.jsx
└── main.jsx
```

### Routing

```
/                    → Home (exam cards)
/exam/:examId        → ExamDetail (topic cards)
/exam/:examId/:topicId → Quiz (questions)
```

## v1.1 Sprint (1hr/day, ~2 weeks)

| Days | Task | Done |
|------|------|------|
| 1-2 | Restructure data: exams.json + questions/ folders | ✅ |
| 3-4 | ExamDetail page + updated routing | ✅ |
| 5-6 | Update Home to show exam cards | ✅ |
| 7-8 | Update Quiz to load topic-specific questions | ✅ |
| 9-10 | Write DCAUTO topic questions (3 topics, 10 each) | ✅ |
| 11-12 | Add EmailCTA component + integration | ✅ |
| 13-14 | Polish, deploy, share | ⬜ |

## v1.1 Success Criteria

- [x] 3+ exam topics with 10 questions each
- [x] Exam → Topic → Quiz navigation works
- [ ] Email CTA captures at least 1 signup
- [ ] Deployed and live

## Lessons Learned from v0

1. Don't scope multivendor from day 1 — start with 1 quiz
2. No marketing copy before product exists
3. No auth UI without auth backend
4. Mobile-first, not desktop-first
5. One AI, one repo, one PC — stop splitting work across agents
6. PRD is law — if it's not here, don't build it

## Agent Handoff Format

```
Phase: [current phase]
Last completed: [task]
Next task: [task]
Blockers: [any issues]
```

## Changelog

| Date | Change |
|------|--------|
| 2026-02-07 | v1.0 PRD created (fresh start) |
| 2026-02-07 | v1.0 deployed to Cloudflare Pages ✅ |
| 2026-02-07 | v1.1 scope added: exam/topic structure, more exams, email CTA |