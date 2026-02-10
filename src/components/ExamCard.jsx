import { Link } from 'react-router-dom'
import { ArrowRight, Info } from './Icons'

export default function ExamCard({ id, name, description, topicCount, questionCount, version, blueprintUrl }) {
  return (
    <div className="bg-white border border-[#e8e0d8] rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <h2 className="text-lg font-semibold text-[#2c2418]">{name}</h2>
        {version && (
          <span className="text-xs font-medium text-[#6b5e52] bg-[#f0ebe4] px-2 py-0.5 rounded-full">{version}</span>
        )}
        {blueprintUrl && (
          <a
            href={blueprintUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#a39686] hover:text-[#e07840] transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            Exam Topics
          </a>
        )}
      </div>
      <p className="text-sm text-[#6b5e52] mb-4">{description}</p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span className="text-xs text-[#a39686]">{topicCount} {topicCount === 1 ? 'topic' : 'topics'} • {questionCount} {questionCount === 1 ? 'question' : 'questions'}</span>
        <Link
          to={`/app/exam/${id}`}
          className="bg-[#e07840] hover:bg-[#c8682f] focus:outline-none focus:ring-2 focus:ring-[#e07840]/50 text-white font-semibold text-sm px-5 py-2.5 w-full sm:w-auto text-center rounded-lg transition-colors"
        >
          Explore <ArrowRight className="w-4 h-4 inline-block ml-1 -mt-0.5" />
        </Link>
      </div>
    </div>
  )
}
