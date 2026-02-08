import { Link } from 'react-router-dom'

export default function ExamCard({ id, name, description, topicCount, questionCount, category = 'devnet' }) {
  const colorClasses = category === 'enterprise'
    ? 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500/50'
    : 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500/50'

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
      <h2 className="text-lg font-semibold text-[#f5f5f5] mb-1">{name}</h2>
      <p className="text-sm text-[#a0a0a0] mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#666666]">{topicCount} topics • {questionCount} questions</span>
        <Link
          to={`/exam/${id}`}
          className={`${colorClasses} focus:outline-none focus:ring-2 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors`}
        >
          Explore
        </Link>
      </div>
    </div>
  )
}
