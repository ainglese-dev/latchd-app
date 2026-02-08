import StreakCounter from '../components/StreakCounter'
import ExamCard from '../components/ExamCard'
import EmailCTA from '../components/EmailCTA'
import exams from '../data/exams.json'

export default function Home() {
  return (
    <div className="min-h-screen px-4 py-6 pb-8">
      <div className="max-w-lg mx-auto">
        <header className="mb-8">
          <h1 className="text-xl font-bold text-[#f5f5f5]">Latchd</h1>
          <p className="text-sm text-[#a0a0a0]">Cisco certification practice</p>
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
              category={exam.category}
            />
          ))}
        </div>

        <div className="mt-8">
          <EmailCTA />
        </div>
      </div>
    </div>
  )
}
