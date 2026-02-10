import { Link } from 'react-router-dom'
import StreakCounter from '../components/StreakCounter'
import ExamCard from '../components/ExamCard'
import exams from '../data/exams.json'
import { useSEO } from '../utils/useSEO'

export default function Home() {
  useSEO({ title: 'Latchd — Cisco Certification Practice Quizzes', path: '/app' })

  return (
    <div className="min-h-dvh px-4 py-6 pb-8">
      <div className="max-w-lg mx-auto">
        <header className="mb-8">
          <Link to="/" className="text-xl font-bold text-[#2c2418] hover:text-[#e07840] transition-colors">Latchd</Link>
          <p className="text-sm text-[#6b5e52]">Cisco certification practice 🛸</p>
        </header>

        <div className="mb-6">
          <StreakCounter />
        </div>

        <div className="space-y-4">
          {exams.map(exam => (
            <ExamCard
              key={exam.id}
              id={exam.id}
              name={exam.name}
              description={exam.description}
              topicCount={exam.topics.length}
              questionCount={exam.topics.reduce((sum, t) => sum + (t.questionCount || 0), 0)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
