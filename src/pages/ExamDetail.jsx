import { useParams, Link } from 'react-router-dom'
import TopicCard from '../components/TopicCard'
import { ArrowLeft } from '../components/Icons'
import exams from '../data/exams.json'
import { useSEO } from '../utils/useSEO'

export default function ExamDetail() {
  const { examId } = useParams()
  const exam = exams.find(e => e.id === examId)

  useSEO({
    title: exam ? `${exam.name} Practice Quiz | Latchd` : 'Exam Not Found | Latchd',
    path: `/app/exam/${examId}`
  })

  if (!exam) {
    return (
      <div className="min-h-dvh px-4 py-6 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="text-center py-12">
            <h1 className="text-xl font-bold text-[#2c2418] mb-2">Exam not found</h1>
            <Link to="/app" className="inline-flex items-center gap-1 text-sm text-[#e07840] hover:text-[#c8682f]">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh px-4 py-6 pb-8">
      <div className="max-w-lg mx-auto">
        <Link to="/app" className="inline-flex items-center gap-1 text-sm text-[#6b5e52] hover:text-[#2c2418] mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <header className="mb-8">
          <h1 className="text-2xl font-bold text-[#2c2418] mb-2">{exam.name}</h1>
          <p className="text-sm text-[#6b5e52]">{exam.description}</p>
        </header>

        <div className="space-y-4">
          {exam.topics.map(topic => (
            <TopicCard
              key={topic.id}
              examId={exam.id}
              topicId={topic.id}
              name={topic.name}
              description={topic.description}
              questionCount={topic.questionCount || 10}
              locked={topic.locked || false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
