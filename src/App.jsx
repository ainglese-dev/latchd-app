import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import ExamDetail from './pages/ExamDetail'
import Quiz from './pages/Quiz'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Home />} />
        <Route path="/app/exam/:examId" element={<ExamDetail />} />
        <Route path="/app/exam/:examId/:topicId" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  )
}
