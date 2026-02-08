import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ExamDetail from './pages/ExamDetail'
import Quiz from './pages/Quiz'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exam/:examId" element={<ExamDetail />} />
        <Route path="/exam/:examId/:topicId" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  )
}
