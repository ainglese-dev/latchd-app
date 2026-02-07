function getOptionStyle(index, correctIndex, selectedAnswer, showFeedback) {
  const base = 'w-full text-left p-4 rounded-lg border transition-colors text-sm'

  if (!showFeedback) {
    return `${base} border-[#2a2a2a] hover:border-orange-500 hover:bg-[#222222] active:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer`
  }

  if (index === correctIndex) {
    return `${base} border-green-500 bg-green-500/10 cursor-default`
  }
  if (index === selectedAnswer && index !== correctIndex) {
    return `${base} border-red-500 bg-red-500/10 cursor-default`
  }
  return `${base} border-[#2a2a2a] opacity-50 cursor-default`
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
            <span className="font-mono text-orange-500 mr-3">{String.fromCharCode(65 + i)}</span>
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </p>
          <p className="text-sm text-[#a0a0a0] mt-1">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
