import { Link } from 'react-router-dom'
import EmailCTA from '../components/EmailCTA'
import { ArrowRight, Gift, Target, Zap } from '../components/Icons'
import exams from '../data/exams.json'
import { useSEO } from '../utils/useSEO'

export default function Landing() {
  useSEO({ title: 'Latchd — Cisco Certification Practice Quizzes', path: '/' })

  return (
    <div className="min-h-dvh px-4 py-6 pb-12">
      <div className="max-w-3xl mx-auto">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-[#2c2418]">Latchd</Link>
          <Link to="/app" className="inline-flex items-center gap-1 text-sm text-[#6b5e52] hover:text-[#e07840] transition-colors">
            Start Practicing <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>

        {/* Hero */}
        <section className="text-center py-10 sm:py-16 md:py-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2c2418] mb-4">
            Cisco cert practice, done right
          </h1>
          <p className="text-base sm:text-lg text-[#6b5e52] mb-8 max-w-xl mx-auto">
            Free practice quizzes for DCAUTO, DEVASC, DEVCOR, and ENARSI certifications. Start practicing now.
          </p>
          <Link
            to="/app"
            className="inline-block bg-[#e07840] hover:bg-[#c8682f] text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 rounded-lg transition-colors"
          >
            Start Practicing <ArrowRight className="w-5 h-5 inline-block ml-1 -mt-0.5" />
          </Link>
        </section>

        {/* Value Props */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          <div className="text-center p-4 sm:p-6">
            <span className="text-[#e07840] mb-3 flex justify-center"><Gift className="w-6 h-6" /></span>
            <h3 className="font-semibold text-[#2c2418] mb-2">Free to Start</h3>
            <p className="text-sm text-[#6b5e52]">No credit card needed. Jump right in.</p>
          </div>
          <div className="text-center p-4 sm:p-6">
            <span className="text-[#e07840] mb-3 flex justify-center"><Target className="w-6 h-6" /></span>
            <h3 className="font-semibold text-[#2c2418] mb-2">Exam-Focused</h3>
            <p className="text-sm text-[#6b5e52]">Questions mapped to real Cisco exam topics.</p>
          </div>
          <div className="text-center p-4 sm:p-6">
            <span className="text-[#e07840] mb-3 flex justify-center"><Zap className="w-6 h-6" /></span>
            <h3 className="font-semibold text-[#2c2418] mb-2">No Barriers</h3>
            <p className="text-sm text-[#6b5e52]">Start practicing immediately — no account needed for free content.</p>
          </div>
        </section>

        {/* Exam Preview Cards */}
        <section className="mb-10 sm:mb-16">
          <h2 className="text-xl font-semibold text-[#2c2418] text-center mb-8">
            Available Exams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams.map(exam => (
              <Link
                key={exam.id}
                to={`/app/exam/${exam.id}`}
                className="bg-white border border-[#e8e0d8] rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow block"
              >
                <h3 className="text-lg font-semibold text-[#2c2418] mb-1">{exam.name}</h3>
                <p className="text-sm text-[#6b5e52] mb-2">{exam.description}</p>
                <span className="text-xs text-[#a39686]">
                  {exam.topics.length} {exam.topics.length === 1 ? 'topic' : 'topics'}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Email CTA */}
        <section className="mb-16 max-w-lg mx-auto">
          <EmailCTA />
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-[#a39686] border-t border-[#e8e0d8] pt-6">
          <p>Built by Angel</p>
        </footer>
      </div>
    </div>
  )
}
