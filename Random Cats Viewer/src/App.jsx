import { useEffect, useState } from 'react'

const url = 'https://api.freeapi.app/api/v1/public/cats/cat/random'

function App() {
  const [cat, setCat] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const fetchCat = async () => {
    setLoading(true)
    setVisible(false)
    setError(null)
    try {
      const res = await fetch(url)
      const data = await res.json()
      setCat(data.data)
      setTimeout(() => setVisible(true), 50)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCat() }, [])

  return (
    <div className="app">
      <h1>🐱 Random Cat Viewer</h1>

      <div className={`card ${visible ? 'visible' : ''}`}>
        {loading && <div className="skeleton" />}

        {!loading && cat && (
          <>
            <img src={cat.image} alt={cat.name} />
            <div className="info">
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </div>
          </>
        )}

        {error && <p className="error">{error}</p>}
      </div>

      <button className="btn" onClick={fetchCat} disabled={loading}>
        {loading ? 'Loading…' : 'Next Cat →'}
      </button>
    </div>
  )
}

export default App
