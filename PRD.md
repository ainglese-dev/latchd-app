# Latchd v1.0 — PRD

> Single source of truth. Reference this at the start of every AI session.

## Vision

Quiz app for network engineers studying DevNet/DC automation certifications. That's it.

## Target User

Network engineer students preparing for Cisco DevNet exams (DCAUTO, DEVASC, DEVCOR).

## MVP Definition (v1.0)

- 1 quiz: DCAUTO fundamentals, 10 questions
- 3 screens: Home → Quiz → Results
- No auth, no backend, no payments
- JSON quiz data
- localStorage streak tracking
- Mobile-first design

## Stack

| Layer | Choice |
|-------|--------|
| Frontend | React + Vite (no TypeScript) |
| Styling | Tailwind CSS |
| Data | Local JSON files |
| State | localStorage (streak only) |
| Hosting | Cloudflare Pages |
| Domain | latchd.com (later) |

## NOT in v1.0

- No auth / Sign In
- No Supabase
- No payments / Lemon Squeezy
- No badges / mission patches
- No profile page
- No vendor tabs (AWS, Azure, etc.)
- No TypeScript
- No social proof / marketing copy
- No "Get Started Free" CTA
- No leaderboard

## Screens

### 1. Home
- App name: "Latchd"
- Tagline: "DevNet exam practice"
- Current streak (from localStorage)
- Quiz card(s): title, description, question count, "Start" button
- Mobile-first, centered layout

### 2. Quiz
- Progress bar (question X of N)
- Question text
- 4 multiple choice options
- Select → immediate feedback (correct/wrong + explanation)
- "Next Question" button

### 3. Results
- Score: X/10
- Pass/fail message
- Brief per-question review (which you got right/wrong)
- "Try Again" / "Back to Home" buttons
- Update streak in localStorage

## Question Format

```json
{
  "id": "dcauto-001",
  "question": "What is the default administrative distance of eBGP?",
  "options": ["20", "90", "110", "200"],
  "correct": 0,
  "explanation": "eBGP has an AD of 20, while iBGP has 200."
}
```

## File Structure

```
latchd/
├── public/
├── src/
│   ├── components/
│   │   ├── QuizCard.jsx
│   │   ├── Question.jsx
│   │   ├── Results.jsx
│   │   └── StreakCounter.jsx
│   ├── data/
│   │   └── dcauto-fundamentals.json
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Quiz.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 2-Week Sprint (1hr/day)

| Days | Task | Done |
|------|------|------|
| 1-2 | Scaffold project, pick UI references | ⬜ |
| 3-5 | Build 3 screens with routing, no data | ⬜ |
| 6-8 | Write 10 DCAUTO questions, wire quiz logic | ⬜ |
| 9-10 | Streak counter, polish UI | ⬜ |
| 11-12 | Deploy to Cloudflare Pages, test | ⬜ |
| 13-14 | Share with 10 people, collect feedback | ⬜ |

## Success Criteria

- [ ] Deployed and live on a URL
- [ ] 1 complete quiz works end to end
- [ ] You (Angel) like the UI
- [ ] 10 real humans took the quiz

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