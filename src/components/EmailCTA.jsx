import { useState } from 'react'

export default function EmailCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(
    () => localStorage.getItem('latchd_email_submitted') === 'true'
  )

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    localStorage.setItem('latchd_email_submitted', 'true')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 text-center">
        <p className="text-sm text-[#a0a0a0]">You're on the list. We'll notify you when new exams drop.</p>
      </div>
    )
  }

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
      <p className="text-sm font-semibold text-[#f5f5f5] mb-1">Get notified when new exams drop</p>
      <p className="text-xs text-[#666666] mb-4">No spam. Just new quiz content.</p>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 bg-[#111111] border border-[#2a2a2a] focus:border-orange-500 rounded-lg px-3 py-2 text-sm text-[#f5f5f5] placeholder-[#666666] outline-none transition-colors"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
        >
          Notify me
        </button>
      </form>
    </div>
  )
}
