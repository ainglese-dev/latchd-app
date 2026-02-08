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
      <div className="bg-white border border-[#e8e0d8] rounded-xl p-5 shadow-card text-center">
        <p className="text-sm text-[#6b5e52]">You're on the list. We'll notify you when new exams drop.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#e8e0d8] rounded-xl p-5 shadow-card">
      <p className="text-sm font-semibold text-[#2c2418] mb-1">Get notified when new exams drop</p>
      <p className="text-xs text-[#a39686] mb-4">No spam. Just new quiz content.</p>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 bg-[#f5f0ea] border border-[#e8e0d8] focus:border-[#e07840] rounded-lg px-3 py-2 text-sm text-[#2c2418] placeholder-[#a39686] outline-none transition-colors"
        />
        <button
          type="submit"
          className="bg-[#e07840] hover:bg-[#c8682f] text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
        >
          Notify me
        </button>
      </form>
    </div>
  )
}
