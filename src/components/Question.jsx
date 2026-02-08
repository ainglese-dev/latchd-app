function getOptionStyle(index, correctIndex, selectedAnswer, showFeedback) {
  const base = 'w-full text-left p-4 rounded-lg border transition-colors text-sm'

  if (!showFeedback) {
    return `${base} border-[#e8e0d8] hover:border-[#e07840] hover:bg-[#f5f0ea] active:bg-[#f5f0ea] focus:outline-none focus:ring-2 focus:ring-[#e07840]/50 shadow-card cursor-pointer`
  }

  if (index === correctIndex) {
    return `${base} border-[#2d8a4e] bg-[#2d8a4e]/10 cursor-default`
  }
  if (index === selectedAnswer && index !== correctIndex) {
    return `${base} border-[#c44545] bg-[#c44545]/10 cursor-default`
  }
  return `${base} border-[#e8e0d8] opacity-50 cursor-default`
}

export default function Question({ question, selectedAnswer, showFeedback, onSelect }) {
  const isCorrect = selectedAnswer === question.correct

  return (
    <div>
      <p className="text-lg font-medium mb-6 leading-relaxed">{question.question}</p>
      <div className="flex flex-col gap-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            disabled={showFeedback}
            className={getOptionStyle(i, question.correct, selectedAnswer, showFeedback)}
          >
            <span className="font-mono text-[#e07840] mr-3">{String.fromCharCode(65 + i)}</span>
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-[#2d8a4e]/10 border border-[#2d8a4e]/30' : 'bg-[#c44545]/10 border border-[#c44545]/30'}`}>
          <p className={`font-semibold ${isCorrect ? 'text-[#2d8a4e]' : 'text-[#c44545]'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </p>
          <p className="text-sm text-[#6b5e52] mt-1">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
