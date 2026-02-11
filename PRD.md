# Latchd — PRD

> Single source of truth. Reference this at the start of every AI session.

## Vision

Quiz app for network engineers studying Cisco certifications — from CCST entry-level to CCNP professional tracks. That's it.

## Target User

Network engineers and students preparing for Cisco certifications: CCST, CCNA, DEVASC, DCAUTO, DEVCOR, ENARSI.

## v1.0 — COMPLETED ✅

- 1 quiz: DCAUTO fundamentals, 10 questions
- 3 screens: Home → Quiz → Results
- No auth, no backend, no payments
- JSON quiz data, localStorage streak
- Deployed: https://latchd-app.angel-inglese.workers.dev/

## v1.1 — COMPLETED ✅

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
| 13-14 | Polish, deploy, share | ✅ |

## v1.1 Success Criteria

- [x] 3+ exam topics with 10 questions each
- [x] Exam → Topic → Quiz navigation works
- [ ] Email CTA captures at least 1 signup (deferred — localStorage only, no backend)
- [x] Deployed and live

## v1.2 — COMPLETED ✅

### Goals
1. Visual refresh: dark → warm light theme (Claude-inspired + subtle space accents)
2. UX fix: CTA after quiz results ("Try another topic")
3. SEO: meta tags, Open Graph, per-page titles
4. Analytics: Cloudflare Web Analytics

### Theme Direction

Inspired by Claude's warm, cream-toned aesthetic merged with subtle space/NASA personality.

- Cream/warm white background (`#faf8f5` or similar)
- Soft shadows instead of hard borders
- Warm text colors (dark brown/charcoal, not pure black)
- Orange accent stays but softer/warmer
- Subtle space emojis (🚀 🛸 ⭐ 🌌) as personality, not decoration
- Rounded, approachable typography
- Mobile-first, centered `max-w-lg` layout stays

### UX Improvements

- Results screen: add "Try another topic" CTA linking back to the exam's topic list
- Results screen: add "Share your score" (copy-to-clipboard, no social auth)

### SEO

- `<title>` per page ("DCAUTO Practice Quiz | Latchd")
- `<meta name="description">` per page
- Open Graph tags (og:title, og:description, og:image, og:url)
- Favicon (replace vite.svg with Latchd icon)
- Canonical URLs

### Analytics

- Cloudflare Web Analytics (free)
- Add JS snippet to `index.html`
- No cookie banners needed (privacy-first, no cookies)

## NOT in v1.2

- No auth / Sign In
- No Supabase or backend DB
- No payments
- No badges / gamification beyond streak
- No profile page
- No TypeScript
- No real email capture backend (EmailCTA stays localStorage for now)

## v1.2 Sprint (1hr/day, ~2 weeks)

| Days | Task | Done |
|------|------|------|
| 1-2 | Update tailwind config + global styles for warm theme | ✅ |
| 3-4 | Restyle Home, ExamCard, StreakCounter | ✅ |
| 5-6 | Restyle ExamDetail, TopicCard, EmailCTA | ✅ |
| 7-8 | Restyle Quiz, Question, Results + add post-quiz CTA | ✅ |
| 9-10 | SEO: meta tags, OG tags, favicon | ✅ |
| 11-12 | Cloudflare Web Analytics setup + test | ✅ |
| 13-14 | Polish, deploy, verify analytics working | ✅ |

## v1.2 Success Criteria

- [x] Warm light theme applied across all screens
- [x] Space emojis integrated subtly
- [x] Post-quiz CTA works ("Try another topic")
- [x] SEO meta tags on all pages
- [ ] Cloudflare Web Analytics showing visitor data (token placeholder — needs real token)
- [x] Deployed and live

## v1.3 — COMPLETED ✅

### Goals
1. Fix v1.2 deviations (cleanup)
2. Question quality: review accuracy + expand to 15-20 per topic
3. Separate landing page at `/` (app moves to `/app/*`)
4. Locked topic indicators for future premium content

### v1.2 Fixes

- [ ] Replace CF Analytics placeholder token with real token (deferred to v1.4)
- [x] Add `og:image` meta tag (create 1200x630 OG card)
- [x] Dynamic canonical URL per route (not always root)
- [x] Fix "1 topics" → "1 topic" pluralization in ExamCard
- [x] Increase progress bar track contrast (`#e8e0d8` → `#d4cac0`)
- [x] Add back/exit link on Quiz page (top of screen)

### Landing Page

New marketing page at `/` — app moves to `/app/*`.

**Landing page content:**
- Hero: "Cisco cert practice, done right" + CTA → `/app`
- Value props (3 max): free, exam-focused, no signup required
- Exam preview cards (visual only, links to `/app/exam/:id`)
- Email CTA (moved from app Home to landing)
- Footer: minimal (built by Angel, GitHub link optional)

**Landing page style:**
- Same warm theme as app
- Wider layout allowed (`max-w-3xl` or `max-w-4xl`)
- Hero section can be taller/more spacious than app screens

**Routing changes:**
```
/                              → Landing page (NEW)
/app                           → App Home (exam cards)
/app/exam/:examId              → ExamDetail (topic cards)
/app/exam/:examId/:topicId     → Quiz (questions)
```

### Locked Topics

- Some topics show a lock icon (🔒) instead of "Start Quiz"
- Tooltip on hover: "Premium — coming soon"
- No click action, no auth, no paywall
- Controlled by a `locked: true` field in `exams.json` topic entries
- Start with 1-2 topics locked per exam to signal premium is coming

### Question Quality

- Review all 120 existing questions for accuracy
- Expand each topic from 10 to 15-20 questions
- Ensure question difficulty range: ~30% easy, ~50% medium, ~20% hard
- No duplicate concepts across topics within same exam

## NOT in v1.3

- No auth / login
- No payment processing
- No Supabase or backend DB
- No real premium content gating (lock is visual only)
- No TypeScript
- No real email capture backend

## v1.3 Sprint (1hr/day, ~2 weeks)

| Days | Task | Done |
|------|------|------|
| 1-2 | Fix 6 v1.2 deviations | ✅ |
| 3-4 | Landing page: hero + value props + CTA | ✅ |
| 5-6 | Move app routes to /app/*, update all links | ✅ |
| 7-8 | Add locked topic support (exams.json + TopicCard) | ✅ |
| 9-12 | Question review + expand to 15-20 per topic | ✅ |
| 13-14 | Polish, deploy, verify | ✅ |

## v1.3 Success Criteria

- [x] All 6 v1.2 deviations fixed (5/6 — CF Analytics token deferred to v1.4)
- [x] Landing page live at `/`
- [x] App accessible at `/app`
- [x] At least 2 locked topics visible per exam (8 locked total across 4 exams)
- [x] Each topic has 15-20 questions (17 per topic, 204 total)
- [ ] CF Web Analytics collecting real data (deferred to v1.4)
- [x] Deployed and live

## Undocumented Changes (shipped by CC, not in original PRD scope)

These were added during v1.3 implementation without PRD updates:
- **CCST (100-150) exam** — 4 topics (2 free, 2 locked)
- **CCNA (200-301) exam** — 6 topics (4 free, 2 locked)
- **Icons.jsx component** — SVG icon library replacing emoji buttons
- **Version badges** — exam version pills (v1.0, v1.1, v2.0) on ExamCard and ExamDetail
- **Blueprint links** — "Exam Topics" links to Cisco Learning Network per exam
- **ExamCard redesigned** — responsive layout with version + blueprint + pluralization fix
- **TopicCard redesigned** — responsive layout, locked state styling
- **DCAUTO exam renamed** — "DCNAUTO 300-635" in exams.json (typo — should be DCAUTO)
- **DEVCOR exam renamed** — "AUTOCOR (formerly DEVCOR) 350-901" reflecting Cisco rename

## Current State (post-v1.3)

**6 exams, 24 topics total:**
- 12 free topics (~204 questions, 17 per topic)
- 12 locked topics (visual lock only, URL-accessible — intentional)

**Exams:** CCST, CCNA, DEVASC, DCAUTO, DEVCOR, ENARSI

## v1.4 — CURRENT

### Goals (priority order)
1. **Expand free content** — add 1-2 more free topics per exam
2. **Debt cleanup** — fix 7 known issues
3. **Per-topic score history** — localStorage-based progress tracking
4. **Question randomization** — shuffle question order per attempt (stretch)

### 1. Free Content Expansion

More free content = more organic traffic + word of mouth.

**Strategy:** Unlock 1 currently-locked topic per exam OR add a new free topic.
Target: 15-18 free topics (up from 12), ~255-306 questions.

For exams with locked topics that already have question files:
- Move `"locked": true` → `"locked": false` (or remove field)
- Verify question quality before unlocking

For exams where locked topics lack question files:
- Create question files (17 questions each)
- Keep topic locked until questions are written and reviewed

### 2. Debt Cleanup (7 issues)

- [ ] CF Analytics placeholder token → real token (CF dashboard → Web Analytics)
- [ ] `og:image` is SVG → needs PNG/JPG 1200x630 for social previews
- [ ] DCAUTO exam name typo: "DCNAUTO" → "DCAUTO 300-635" in exams.json
- [ ] Missing question files for some locked topics (endpoints-media, troubleshooting, ip-services, wireless-fundamentals, meraki-apis, infrastructure-automation)
- [ ] EmailCTA still localStorage-only (4th version deferred — decide: implement or remove)
- [ ] PRD was stale (fixed in this update)
- [ ] OG meta tags don't update per-route (SPA limitation — static in index.html)

### 3. Per-Topic Score History

- Store last 3 scores per topic in localStorage
- Key: `latchd_scores_{examId}_{topicId}` → `[{score, total, date}]`
- Show on TopicCard: "Last: 8/10" or mini sparkline
- Show on ExamDetail: topic completion indicator (attempted vs not)
- No backend needed

### 4. Question Randomization (stretch)

- Shuffle question order when starting a quiz
- Shuffle answer options per question
- Same questions, different order each attempt
- Increases replay value

### NOT in v1.4

- No auth / login
- No payment processing
- No backend / Supabase / D1
- No real premium gating
- No TypeScript
- No real email capture backend
- No leaderboard
- No badges

### Locked Topic Policy

Locked topics are UI-only hints. Content is accessible via direct URL.
This is intentional — all current content is free. Lock signals future premium.
Route-level gating deferred to when auth + payments exist.

## v1.4 Sprint (1hr/day, ~2 weeks)

| Days | Task | Done |
|------|------|------|
| 1-2 | Fix DCNAUTO typo, og:image PNG, CF Analytics token | ⬜ |
| 3-4 | Unlock/create 1 free topic per exam (6 topics) | ⬜ |
| 5-6 | Write questions for newly unlocked topics (17 each) | ⬜ |
| 7-8 | Review question quality across all free topics | ⬜ |
| 9-10 | Per-topic score history: localStorage + TopicCard UI | ⬜ |
| 11-12 | Question randomization (shuffle on quiz start) | ⬜ |
| 13-14 | Polish, deploy, verify | ⬜ |

## v1.4 Success Criteria

- [ ] 15+ free topics available (up from 12)
- [ ] All 7 debt items resolved or consciously deferred
- [ ] Per-topic score history visible on TopicCard
- [ ] CF Web Analytics collecting real data
- [ ] Questions randomized per attempt
- [ ] Deployed and live

---

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
| 2026-02-08 | v1.1 completed ✅ (4 exams, 12 topics, 120 questions, EmailCTA) |
| 2026-02-08 | v1.2 scope: warm theme, post-quiz CTA, SEO, CF Web Analytics |
| 2026-02-08 | v1.2 completed ✅ (warm theme, SEO, analytics snippet, post-quiz CTAs) |
| 2026-02-08 | v1.3 scope: fixes, landing page, locked topics, question expansion |
| 2026-02-10 | v1.3 completed ✅ (landing page, 8 locked topics, 17q/topic, ENARSI exam, route restructure) |
| 2026-02-11 | Audit: documented CC scope creep (CCST, CCNA, Icons, badges, blueprint links) |
| 2026-02-11 | v1.4 scope: free content expansion, debt cleanup, score history, randomization |