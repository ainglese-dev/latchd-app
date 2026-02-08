import { useState } from 'react'

const STREAK_KEY = 'latchd_streak'

function getStreak() {
  const raw = localStorage.getItem(STREAK_KEY)
  if (!raw) return 0
  try {
    const { count, lastDate } = JSON.parse(raw)
    const today = new Date().toLocaleDateString('en-CA')
    if (lastDate === today) return count
    const last = new Date(lastDate + 'T00:00:00')
    const now = new Date(today + 'T00:00:00')
    const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24))
    if (diffDays === 1) return count
    return 0
  } catch {
    return 0
  }
}

export default function StreakCounter() {
  const [streak] = useState(getStreak)

  return (
    <div className="flex items-center gap-2 text-[#6b5e52] text-sm">
      <span>🔥</span>
      <span className="text-[#e07840] font-semibold text-base">{streak}</span>
      <span>day streak</span>
    </div>
  )
}
