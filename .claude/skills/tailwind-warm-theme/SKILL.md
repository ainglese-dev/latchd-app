---
name: tailwind-warm-theme
description: Design system and Tailwind CSS patterns for Latchd quiz app (v1.2+ warm light theme). Use this skill when styling Latchd components, creating new UI elements, choosing colors, spacing, or typography. Also trigger when the user asks about the app's look, theme, design consistency, or mobile layout. Ensures visual consistency across AI sessions.
---

# Latchd Design System (Tailwind — Warm Light Theme)

Warm, cream-toned light theme inspired by Claude's aesthetic + subtle space/NASA personality. Mobile-first. Clean, approachable, professional.

## Color Palette

```
Background:     #faf8f5 (bg-[#faf8f5])     — main page bg
Surface:        #ffffff (bg-white)          — cards, containers
Surface alt:    #f5f0ea (bg-[#f5f0ea])     — secondary sections, input bg
Border:         #e8e0d8 (border-[#e8e0d8]) — subtle card borders
Border hover:   #d4cac0 (border-[#d4cac0]) — focused/hovered borders

Text primary:   #2c2418 (text-[#2c2418])   — headings, main text (warm charcoal)
Text secondary: #6b5e52 (text-[#6b5e52])   — descriptions, labels
Text muted:     #a39686 (text-[#a39686])   — placeholders, disabled

Accent:         #e07840 (text-[#e07840])   — CTAs, active states, progress (warm orange)
Accent hover:   #c8682f (bg-[#c8682f])     — button hover
Accent subtle:  #e07840/10                  — accent backgrounds

Correct:        #2d8a4e (text-[#2d8a4e])   — right answers (forest green)
Correct bg:     #2d8a4e/10                  — correct feedback bg
Wrong:          #c44545 (text-[#c44545])    — wrong answers (warm red)
Wrong bg:       #c44545/10                  — wrong feedback bg
```

## Tailwind Config

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf8f5',
        surface: '#f5f0ea',
        accent: '#e07840',
        'accent-hover': '#c8682f',
        charcoal: '#2c2418',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(44, 36, 24, 0.06), 0 1px 2px rgba(44, 36, 24, 0.04)',
        'card-hover': '0 4px 12px rgba(44, 36, 24, 0.08), 0 2px 4px rgba(44, 36, 24, 0.04)',
      },
    },
  },
  plugins: [],
}
```

Inter font stays in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Layout Patterns

### Mobile-First Container

Every page uses this wrapper:

```jsx
<div className="min-h-screen bg-[#faf8f5] text-[#2c2418]">
  <div className="max-w-lg mx-auto px-4 py-6">
    {/* page content */}
  </div>
</div>
```

### Card Component

```jsx
<div className="bg-white border border-[#e8e0d8] rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
  {/* card content */}
</div>
```

Rules:
- `rounded-xl` on cards
- Soft shadow (`shadow-card`), NOT hard borders as primary visual
- Border is subtle (`border-[#e8e0d8]`), shadow does the work
- Padding `p-5` standard, `p-4` compact
- Hover lifts slightly via `shadow-card-hover`

### Primary Button (CTA)

```jsx
<button className="w-full bg-[#e07840] hover:bg-[#c8682f] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
  Start Quiz 🚀
</button>
```

### Secondary Button

```jsx
<button className="w-full border border-[#d4cac0] hover:border-[#c8682f] hover:bg-[#f5f0ea] text-[#2c2418] font-medium py-3 px-6 rounded-lg transition-colors">
  Back to Home
</button>
```

### Quiz Option Button

```jsx
{/* Default state */}
<button className="w-full text-left p-4 rounded-lg border border-[#e8e0d8] hover:border-[#e07840] hover:bg-[#f5f0ea] transition-colors shadow-card">
  <span className="font-mono text-[#e07840] mr-3">A</span>
  Option text
</button>

{/* Correct answer revealed */}
<button className="w-full text-left p-4 rounded-lg border border-[#2d8a4e] bg-[#2d8a4e]/10">
  ...
</button>

{/* Wrong answer revealed */}
<button className="w-full text-left p-4 rounded-lg border border-[#c44545] bg-[#c44545]/10">
  ...
</button>
```

## Typography Scale

```
App name:       text-xl font-bold text-[#2c2418]
Page heading:   text-2xl font-bold text-[#2c2418]
Card title:     text-lg font-semibold text-[#2c2418]
Body text:      text-base text-[#2c2418]
Description:    text-sm text-[#6b5e52]
Label/meta:     text-xs text-[#a39686] uppercase tracking-wide
Question text:  text-lg font-medium text-[#2c2418]
```

## Spacing Conventions

```
Between sections:    space-y-8 or mb-8
Between cards:       space-y-4
Inside cards:        space-y-3
Button groups:       gap-4 flex
Progress bar height: h-2
```

## Space Emoji Usage

Emojis add personality, used sparingly:

```
Home header tagline:    "Cisco certification practice 🛸"
CTA buttons:            "Start Quiz 🚀"
Streak counter:         "🔥 5 day streak"
Results - pass:         "⭐ Passed!"
Results - fail:         "🌌 Keep exploring"
Exam cards:             One emoji per exam category (optional)
```

Rules:
- Max 1 emoji per component/section
- Never in question text or explanations
- Never in navigation or error states
- Space-themed only (🚀 🛸 ⭐ 🌌 🌍 🛰️), no generic emojis

## Feedback Colors

```jsx
{/* Correct feedback box */}
<div className="mt-4 p-4 rounded-lg bg-[#2d8a4e]/10 border border-[#2d8a4e]/30">
  <p className="text-[#2d8a4e] font-semibold">Correct!</p>
  <p className="text-sm text-[#6b5e52] mt-1">Explanation here</p>
</div>

{/* Wrong feedback box */}
<div className="mt-4 p-4 rounded-lg bg-[#c44545]/10 border border-[#c44545]/30">
  <p className="text-[#c44545] font-semibold">Incorrect</p>
  <p className="text-sm text-[#6b5e52] mt-1">Explanation here</p>
</div>
```

## Progress Bar

```jsx
<div className="w-full h-2 bg-[#e8e0d8] rounded-full">
  <div
    className="h-2 bg-[#e07840] rounded-full transition-all duration-300"
    style={{ width: `${pct}%` }}
  />
</div>
```

## Navigation

Simple header with optional back link:

```jsx
<header className="flex items-center justify-between mb-8">
  <h1 className="text-xl font-bold text-[#2c2418]">Latchd</h1>
</header>
```

Back link for inner pages:
```jsx
<Link to="/" className="text-[#6b5e52] hover:text-[#2c2418] text-sm">← Back</Link>
```

## Anti-Patterns (Don't Do)

- No dark backgrounds — this is a warm light theme
- No pure black text — use `#2c2418` (warm charcoal)
- No pure white bg for page — use `#faf8f5` (cream)
- No hard borders without shadows on cards
- No gradients
- No rounded-full on cards (only on pills/avatars)
- No heavy animations beyond `transition-colors` and `transition-shadow`
- No images or illustrations in v1.2
- No more than 1 emoji per section
- No emoji in questions, explanations, or error states
