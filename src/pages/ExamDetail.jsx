import { useParams, Link } from 'react-router-dom'
import TopicCard from '../components/TopicCard'
import exams from '../data/exams.json'

export default function ExamDetail() {
  const { examId } = useParams()
  const exam = exams.find(e => e.id === examId)

  if (!exam) {
    return (
      <div className="min-h-screen px-4 py-6 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="text-center py-12">
            <h1 className="text-xl font-bold text-[#f5f5f5] mb-2">Exam not found</h1>
            <Link to="/" className="text-sm text-orange-500 hover:text-orange-400">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-6 pb-8">
      <div className="max-w-lg mx-auto">
        <Link to="/" className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5] mb-6 inline-block">
          ← Back to Home
        </Link>

        <header className="mb-8">
          <h1 className="text-2xl font-bold text-[#f5f5f5] mb-2">{exam.name}</h1>
          <p className="text-sm text-[#a0a0a0]">{exam.description}</p>
        </header>

        <div className="space-y-4">
          {exam.topics.map(topic => (
            <TopicCard
              key={topic.id}
              examId={exam.id}
              topicId={topic.id}
              name={topic.name}
              description={topic.description}
              questionCount={10}
              category={exam.category}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
