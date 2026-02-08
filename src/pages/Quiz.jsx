import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Question from '../components/Question'
import Results from '../components/Results'
import { loadQuestions } from '../utils/questionLoader'

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
  const { examId, topicId } = useParams()
  const [state, setState] = useState(initialState)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { currentIndex, selectedAnswer, showFeedback, answers, completed } = state

  useEffect(() => {
    setLoading(true)
    loadQuestions(examId, topicId).then(data => {
      if (data) {
        setQuestions(data)
        setError(null)
      } else {
        setError('Failed to load questions')
      }
      setLoading(false)
    })
  }, [examId, topicId])

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
  }, [currentIndex, showFeedback, questions])

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
  }, [currentIndex, questions])

  const handleTryAgain = useCallback(() => {
    setState(initialState)
  }, [])

  const handleBackHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-6 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="text-center py-12">
            <div className="text-[#a0a0a0]">Loading questions...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen px-4 py-6 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="text-center py-12">
            <h1 className="text-xl font-bold text-[#f5f5f5] mb-2">
              {error || 'No questions found'}
            </h1>
            <button
              onClick={handleBackHome}
              className="text-sm text-orange-500 hover:text-orange-400"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

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
