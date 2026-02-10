import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Compass, CheckCircle, XCircle } from './Icons'

export default function Results({ questions, answers, onTryAgain, onBackHome, examId }) {
  const score = answers.filter(a => a.correct).length
  const total = questions.length
  const passed = score >= Math.ceil(total * 0.7)
  const [copied, setCopied] = useState(false)

  function handleShare() {
    const text = `I scored ${score}/${total} on Latchd! 🚀 Practice Cisco cert quizzes at latchd-app.angel-inglese.workers.dev`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="pb-8">
      <div className="text-center mb-8">
        <p className="text-4xl sm:text-5xl font-bold text-[#2c2418] mb-2">{score}/{total}</p>
        <p className={`text-lg font-medium ${passed ? 'text-[#2d8a4e]' : 'text-[#c44545]'}`}>
          {passed ? <><Star className="w-5 h-5 inline-block -mt-0.5 mr-1" /> Passed!</> : <><Compass className="w-5 h-5 inline-block -mt-0.5 mr-1" /> Keep exploring</>}
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {questions.map((q, i) => {
          const isCorrect = answers[i]?.correct
          return (
            <div
              key={q.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#e8e0d8] shadow-card"
            >
              <span className={`mt-0.5 shrink-0 ${isCorrect ? 'text-[#2d8a4e]' : 'text-[#c44545]'}`}>{isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}</span>
              <p className="text-sm text-[#6b5e52] leading-relaxed">{q.question}</p>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onTryAgain}
          className="w-full bg-[#e07840] hover:bg-[#c8682f] focus:outline-none focus:ring-2 focus:ring-[#e07840]/50 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={handleShare}
          className="w-full border border-[#d4cac0] hover:border-[#c8682f] hover:bg-[#f5f0ea] focus:outline-none focus:ring-2 focus:ring-[#e07840]/50 text-[#2c2418] font-medium py-3 rounded-lg transition-colors"
        >
          {copied ? 'Copied!' : 'Share your score'}
        </button>
        {examId && (
          <Link
            to={`/app/exam/${examId}`}
            className="w-full block text-center border border-[#d4cac0] hover:border-[#c8682f] hover:bg-[#f5f0ea] focus:outline-none focus:ring-2 focus:ring-[#e07840]/50 text-[#2c2418] font-medium py-3 rounded-lg transition-colors"
          >
            Try another topic
          </Link>
        )}
        <button
          onClick={onBackHome}
          className="w-full border border-[#d4cac0] hover:border-[#c8682f] hover:bg-[#f5f0ea] focus:outline-none focus:ring-2 focus:ring-[#e07840]/50 text-[#2c2418] font-medium py-3 rounded-lg transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
