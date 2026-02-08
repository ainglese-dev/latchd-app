---
name: react-quiz-component
description: Patterns and best practices for building quiz UI components in React. Use this skill when creating quiz screens, question components, scoring logic, answer feedback, progress tracking, or localStorage streak features. Trigger when user asks to build quiz questions, results screens, multiple choice components, or any exam/test-taking UI in React.
---

# React Quiz Component Patterns

Reusable patterns for building static quiz apps in React + Vite. No backend, no auth — just JSON data and localStorage.

## Quiz State Machine

Every quiz follows this flow. Implement it in a single `useReducer` or `useState` group — don't scatter state across components.

```
IDLE → ANSWERING → FEEDBACK → (next question or) COMPLETED
```

### State Shape

```javascript
const initialState = {
  currentIndex: 0,
  selectedAnswer: null,
  showFeedback: false,
  answers: [],        // array of { questionId, selected, correct }
  completed: false
}
```

### Core Logic (in Quiz page component)

```javascript
function handleSelect(optionIndex) {
  if (showFeedback) return  // prevent double-click
  setSelectedAnswer(optionIndex)
  setShowFeedback(true)
  
  const isCorrect = optionIndex === questions[currentIndex].correct
  setAnswers(prev => [...prev, {
    questionId: questions[currentIndex].id,
    selected: optionIndex,
    correct: isCorrect
  }])
}

function handleNext() {
  if (currentIndex + 1 >= questions.length) {
    setCompleted(true)
    return
  }
  setCurrentIndex(prev => prev + 1)
  setSelectedAnswer(null)
  setShowFeedback(false)
}
```

## Question Component

Keep it dumb — receives props, renders, calls back.

```jsx
function Question({ question, selectedAnswer, showFeedback, onSelect }) {
  return (
    <div>
      <p className="text-lg font-medium mb-6">{question.question}</p>
      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            disabled={showFeedback}
            className={getOptionStyle(i, question.correct, selectedAnswer, showFeedback)}
          >
            <span className="font-mono mr-3">{String.fromCharCode(65 + i)}</span>
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className={selectedAnswer === question.correct 
          ? "mt-4 p-3 rounded bg-green-900/30 border border-green-700"
          : "mt-4 p-3 rounded bg-red-900/30 border border-red-700"
        }>
          <p className="font-semibold">{selectedAnswer === question.correct ? "Correct!" : "Incorrect"}</p>
          <p className="text-sm text-gray-300 mt-1">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
```

## Option Styling Logic

This is the trickiest part — getting the green/red feedback right.

```javascript
function getOptionStyle(index, correctIndex, selectedAnswer, showFeedback) {
  const base = "w-full text-left p-4 rounded-lg border transition-colors"
  
  if (!showFeedback) {
    return `${base} border-gray-700 hover:border-orange-500 hover:bg-gray-800`
  }
  
  // After answering
  if (index === correctIndex) {
    return `${base} border-green-500 bg-green-900/20`  // always highlight correct
  }
  if (index === selectedAnswer && index !== correctIndex) {
    return `${base} border-red-500 bg-red-900/20`  // highlight wrong selection
  }
  return `${base} border-gray-700 opacity-50`  // dim others
}
```

## Progress Bar

Simple, no library needed.

```jsx
function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100
  return (
    <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
      <div
        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
```

## Results Component

Show score, per-question review, and action buttons.

```jsx
function Results({ answers, questions, onRetry, onHome }) {
  const score = answers.filter(a => a.correct).length
  const passed = score >= Math.ceil(questions.length * 0.7)  // 70% pass
  
  return (
    <div className="max-w-lg mx-auto text-center">
      <p className="text-5xl font-bold">{score}/{questions.length}</p>
      <p className={passed ? "text-green-400 mt-2" : "text-red-400 mt-2"}>
        {passed ? "Passed!" : "Keep studying"}
      </p>
      
      {/* Per-question review */}
      <div className="mt-8 space-y-2 text-left">
        {questions.map((q, i) => (
          <div key={q.id} className="flex items-center gap-2 text-sm">
            <span>{answers[i]?.correct ? "✅" : "❌"}</span>
            <span className="text-gray-400">{q.question}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex gap-4 justify-center">
        <button onClick={onRetry} className="px-6 py-3 bg-orange-500 rounded-lg font-medium">
          Try Again
        </button>
        <button onClick={onHome} className="px-6 py-3 border border-gray-600 rounded-lg">
          Home
        </button>
      </div>
    </div>
  )
}
```

## localStorage Streak

Keep it minimal — just track consecutive days.

```javascript
const STREAK_KEY = 'latchd_streak'

function getStreak() {
  const data = JSON.parse(localStorage.getItem(STREAK_KEY) || '{"count":0,"lastDate":null}')
  return data
}

function updateStreak() {
  const { count, lastDate } = getStreak()
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  
  if (lastDate === today) return count  // already counted today
  
  const newCount = lastDate === yesterday ? count + 1 : 1  // consecutive or reset
  localStorage.setItem(STREAK_KEY, JSON.stringify({ count: newCount, lastDate: today }))
  return newCount
}
```

Call `updateStreak()` when a quiz is completed (in Results screen mount).

## Loading Quiz Data (v1.1)

With the exam/topic structure, use dynamic imports:

```javascript
// In Quiz.jsx — load questions based on route params
import { useParams } from 'react-router-dom'
import exams from '../data/exams.json'

function Quiz() {
  const { examId, topicId } = useParams()
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const exam = exams.find(e => e.id === examId)
    const topic = exam?.topics.find(t => t.id === topicId)
    if (topic) {
      import(`../data/questions/${topic.file}`).then(mod => setQuestions(mod.default))
    }
  }, [examId, topicId])
}
```

## Common Pitfalls

1. **Don't shuffle on every render** — shuffle once when quiz starts, store in state
2. **Don't use index as key** if you shuffle — use `question.id`
3. **Disable options after answering** — prevent score manipulation
4. **Don't store quiz results in localStorage for v1.1** — only streak
5. **Keep all quiz state in the Quiz page** — don't lift to App level
