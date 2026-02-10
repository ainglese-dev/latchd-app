import { Link } from 'react-router-dom'

export default function ExamCard({ id, name, description, topicCount, questionCount }) {
  return (
    <div className="bg-white border border-[#e8e0d8] rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
      <h2 className="text-lg font-semibold text-[#2c2418] mb-1">{name}</h2>
      <p className="text-sm text-[#6b5e52] mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#a39686]">{topicCount} {topicCount === 1 ? 'topic' : 'topics'} • {questionCount} {questionCount === 1 ? 'question' : 'questions'}</span>
        <Link
          to={`/app/exam/${id}`}
          className="bg-[#e07840] hover:bg-[#c8682f] focus:outline-none focus:ring-2 focus:ring-[#e07840]/50 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
        >
          Explore 🚀
        </Link>
      </div>
    </div>
  )
}
