import { Link } from 'react-router-dom'

export default function TopicCard({ examId, topicId, name, description, questionCount, locked }) {
  return (
    <div className={`bg-white border border-[#e8e0d8] rounded-xl p-5 shadow-card transition-shadow ${locked ? 'opacity-75' : 'hover:shadow-card-hover'}`}>
      <h2 className="text-lg font-semibold text-[#2c2418] mb-1">{name}</h2>
      <p className="text-sm text-[#6b5e52] mb-4">{description}</p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span className="text-xs text-[#a39686]">{questionCount} questions</span>
        {locked ? (
          <span
            className="text-sm text-[#a39686] font-medium px-5 py-2 cursor-default"
            title="Premium — coming soon"
          >
            🔒 Locked
          </span>
        ) : (
          <Link
            to={`/app/exam/${examId}/${topicId}`}
            className="bg-[#e07840] hover:bg-[#c8682f] focus:outline-none focus:ring-2 focus:ring-[#e07840]/50 text-white font-semibold text-sm px-5 py-2.5 w-full sm:w-auto text-center rounded-lg transition-colors"
          >
            Start Quiz 🚀
          </Link>
        )}
      </div>
    </div>
  )
}
