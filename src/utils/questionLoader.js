export async function loadQuestions(examId, topicId) {
  try {
    const module = await import(`../data/questions/${examId}/${topicId}.json`)
    return module.default
  } catch (error) {
    console.error(`Failed to load questions for ${examId}/${topicId}:`, error)
    return null
  }
}
