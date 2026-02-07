import StreakCounter from '../components/StreakCounter'
import QuizCard from '../components/QuizCard'
import questions from '../data/dcauto-fundamentals.json'

export default function Home() {
  return (
    <div className="min-h-screen px-4 py-6 pb-8">
      <div className="max-w-lg mx-auto">
        <header className="mb-8">
          <h1 className="text-xl font-bold text-[#f5f5f5]">Latchd</h1>
          <p className="text-sm text-[#a0a0a0]">DevNet exam practice</p>
        </header>

        <div className="mb-6">
          <StreakCounter />
        </div>

        <QuizCard
          id="dcauto-fundamentals"
          title="DCAUTO Fundamentals"
          description="Cisco DevNet Automation basics — APIs, YANG, NETCONF, and more"
          questionCount={questions.length}
        />
      </div>
    </div>
  )
}
