import { useEffect } from 'react'

const BASE_URL = 'https://latchd-app.angel-inglese.workers.dev'

export function useSEO({ title, path }) {
  useEffect(() => {
    document.title = title
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', `${BASE_URL}${path}`)
    }
  }, [title, path])
}
