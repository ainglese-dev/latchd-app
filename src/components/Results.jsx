export default function Results({ questions, answers, onTryAgain, onBackHome }) {
  const score = answers.filter(a => a.correct).length
  const total = questions.length
  const passed = score >= Math.ceil(total * 0.7)

  return (
    <div className="pb-8">
      <div className="text-center mb-8">
        <p className="text-5xl font-bold text-[#f5f5f5] mb-2">{score}/{total}</p>
        <p className={`text-lg font-medium ${passed ? 'text-green-500' : 'text-red-500'}`}>
          {passed ? 'You passed!' : 'Keep studying!'}
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {questions.map((q, i) => {
          const isCorrect = answers[i]?.correct
          return (
            <div
              key={q.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]"
            >
              <span className="text-lg mt-0.5 shrink-0">{isCorrect ? '✅' : '❌'}</span>
              <p className="text-sm text-[#a0a0a0] leading-relaxed">{q.question}</p>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onTryAgain}
          className="w-full bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={onBackHome}
          className="w-full border border-[#3a3a3a] hover:border-[#4a4a4a] hover:bg-[#222222] focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-[#f5f5f5] font-medium py-3 rounded-lg transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
