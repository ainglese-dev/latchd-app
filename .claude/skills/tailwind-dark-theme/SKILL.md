---
name: tailwind-dark-theme
description: Design system and Tailwind CSS patterns for Latchd quiz app. Use this skill when styling Latchd components, creating new UI elements, choosing colors, spacing, or typography for the quiz app. Also trigger when the user asks about the app's look, theme, design consistency, or mobile layout. Ensures visual consistency across AI sessions so the app doesn't look like 3 different people styled it.
---

# Latchd Design System (Tailwind)

Dark theme with warm orange accents. Mobile-first. Clean and professional — not gamified, not corporate.

## Color Palette

Use these exact values in `tailwind.config.js` or as arbitrary values:

```
Background:     #111111 (bg-[#111111])     — main bg
Surface:        #1a1a1a (bg-[#1a1a1a])     — cards, containers
Surface hover:  #222222 (bg-[#222222])     — interactive hover
Border:         #2a2a2a (border-[#2a2a2a]) — subtle borders
Border active:  #3a3a3a (border-[#3a3a3a]) — focused/hovered borders

Text primary:   #f5f5f5 (text-[#f5f5f5])  — headings, main text
Text secondary: #a0a0a0 (text-[#a0a0a0])  — descriptions, labels
Text muted:     #666666 (text-[#666666])   — placeholders, disabled

Accent:         #f97316 (text-orange-500)  — CTAs, active states, progress
Accent hover:   #ea580c (bg-orange-600)    — button hover
Accent subtle:  orange-500/10              — accent backgrounds

Correct:        #22c55e (green-500)        — right answers
Wrong:          #ef4444 (red-500)          — wrong answers
```

## Tailwind Config

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#1a1a1a',
        'surface-hover': '#222222',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

Add Inter font in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Layout Patterns

### Mobile-First Container

Every page uses this wrapper:

```jsx
<div className="min-h-screen bg-[#111111] text-[#f5f5f5]">
  <div className="max-w-lg mx-auto px-4 py-6">
    {/* page content */}
  </div>
</div>
```

`max-w-lg` (32rem / 512px) keeps content readable on all screens. Don't go wider for quiz content.

### Card Component

```jsx
<div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
  {/* card content */}
</div>
```

Rules:
- `rounded-xl` on cards (not rounded-lg, not rounded-2xl)
- Border always `border-[#2a2a2a]`
- Padding `p-5` standard, `p-4` compact
- No shadows — borders do the work in dark themes

### Primary Button (CTA)

```jsx
<button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
  Start Quiz
</button>
```

### Secondary Button

```jsx
<button className="w-full border border-[#3a3a3a] hover:border-[#4a4a4a] hover:bg-[#222222] text-[#f5f5f5] font-medium py-3 px-6 rounded-lg transition-colors">
  Back to Home
</button>
```

### Quiz Option Button

```jsx
{/* Default state */}
<button className="w-full text-left p-4 rounded-lg border border-[#2a2a2a] hover:border-orange-500 hover:bg-[#222222] transition-colors">
  <span className="font-mono text-orange-500 mr-3">A</span>
  Option text
</button>

{/* Correct answer revealed */}
<button className="w-full text-left p-4 rounded-lg border border-green-500 bg-green-500/10">
  ...
</button>

{/* Wrong answer revealed */}
<button className="w-full text-left p-4 rounded-lg border border-red-500 bg-red-500/10">
  ...
</button>
```

## Typography Scale

```
App name:       text-xl font-bold
Page heading:   text-2xl font-bold
Card title:     text-lg font-semibold
Body text:      text-base text-[#f5f5f5]
Description:    text-sm text-[#a0a0a0]
Label/meta:     text-xs text-[#666666] uppercase tracking-wide
Question text:  text-lg font-medium
```

## Spacing Conventions

```
Between sections:    space-y-8 or mb-8
Between cards:       space-y-4
Inside cards:        space-y-3
Button groups:       gap-4 flex
Progress bar height: h-2
```

## Feedback Colors

```jsx
{/* Correct feedback box */}
<div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
  <p className="text-green-400 font-semibold">Correct!</p>
  <p className="text-sm text-[#a0a0a0] mt-1">Explanation here</p>
</div>

{/* Wrong feedback box */}
<div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
  <p className="text-red-400 font-semibold">Incorrect</p>
  <p className="text-sm text-[#a0a0a0] mt-1">Explanation here</p>
</div>
```

## Navigation

v1.1 has no bottom nav — just a simple header with optional back:

```jsx
<header className="flex items-center justify-between mb-8">
  <h1 className="text-xl font-bold">Latchd</h1>
</header>
```

For Exam Detail and Quiz pages, add a back link:
```jsx
<Link to="/" className="text-[#a0a0a0] hover:text-[#f5f5f5] text-sm">← Back</Link>
```

## Anti-Patterns (Don't Do)

- No gradients — keep backgrounds flat
- No shadows (box-shadow) — use borders instead
- No rounded-full on cards (only on pills/badges)
- No text-white — use `text-[#f5f5f5]` for slight warmth
- No bg-gray-900 — use `bg-[#111111]` and `bg-[#1a1a1a]` for consistency
- No animations beyond `transition-colors` and `transition-all duration-300` on progress bar
- No images or illustrations in v1.1
- No emoji in UI (only ✅/❌ in results review)
