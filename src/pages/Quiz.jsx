import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Question from '../components/Question'
import Results from '../components/Results'
import questions from '../data/dcauto-fundamentals.json'

const STREAK_KEY = 'latchd_streak'

const initialState = {
  currentIndex: 0,
  selectedAnswer: null,
  showFeedback: false,
  answers: [],
  completed: false
}

function updateStreak() {
  const today = new Date().toLocaleDateString('en-CA')
  const raw = localStorage.getItem(STREAK_KEY)
  let newCount = 1

  if (raw) {
    try {
      const { count, lastDate } = JSON.parse(raw)
      if (lastDate === today) return
      const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA')
      if (lastDate === yesterday) {
        newCount = count + 1
      }
    } catch {
      // Corrupt data, reset
    }
  }

  localStorage.setItem(STREAK_KEY, JSON.stringify({ count: newCount, lastDate: today }))
}

export default function Quiz() {
  const navigate = useNavigate()
  const [state, setState] = useState(initialState)
  const { currentIndex, selectedAnswer, showFeedback, answers, completed } = state

  const handleSelect = useCallback((index) => {
    if (showFeedback) return

    const currentQuestion = questions[currentIndex]
    const isCorrect = index === currentQuestion.correct

    setState(prev => ({
      ...prev,
      selectedAnswer: index,
      showFeedback: true,
      answers: [
        ...prev.answers,
        { questionId: currentQuestion.id, selected: index, correct: isCorrect }
      ]
    }))
  }, [currentIndex, showFeedback])

  const handleNext = useCallback(() => {
    window.scrollTo(0, 0)
    if (currentIndex < questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: null,
        showFeedback: false
      }))
    } else {
      setState(prev => ({ ...prev, completed: true }))
      updateStreak()
    }
  }, [currentIndex])

  const handleTryAgain = useCallback(() => {
    setState(initialState)
  }, [])

  const handleBackHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  if (completed) {
    return (
      <div className="min-h-screen px-4 py-6 pb-8">
        <div className="max-w-lg mx-auto">
          <Results
            questions={questions}
            answers={answers}
            onTryAgain={handleTryAgain}
            onBackHome={handleBackHome}
          />
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const progressPct = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen px-4 py-6 pb-8">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#a0a0a0]">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-xs text-[#666666]">
              {Math.round(progressPct)}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#2a2a2a] rounded-full">
            <div
              className="h-2 bg-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <Question
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
          onSelect={handleSelect}
        />

        {showFeedback && (
          <button
            onClick={handleNext}
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  )
}
