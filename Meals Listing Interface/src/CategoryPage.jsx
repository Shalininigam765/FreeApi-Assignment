import { useState, useEffect } from 'react'

const URL = 'https://api.freeapi.app/api/v1/public/meals'

export default function CategoryPage({ onSelect }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      let all = [], page = 1, totalPages = 1
      while (page <= totalPages) {
        const res = await fetch(`${URL}?page=${page}&limit=100`)
        const data = await res.json()
        all = [...all, ...data.data.data]
        totalPages = data.data.totalPages
        page++
      }
      const cats = [...new Map(all.map(m => [m.strCategory, m])).entries()]
        .map(([name, meal]) => ({ name, thumb: meal.strMealThumb }))
        .sort((a, b) => a.name.localeCompare(b.name))
      setCategories(cats)
      setLoading(false)
    }
    fetchAll()
  }, [])

  return (
    <div className="page category-page">
      <header>
        <h1>🍽️ Meal Explorer </h1>
        <p>Let your taste buds explore a world of delicious meals!</p>
      </header>

      {loading
        ? <div className="loader">Loading categories...</div>
        : (
          <div className="category-grid">
            {categories.map(c => (
              <button key={c.name} className="cat-card" onClick={() => onSelect(c.name)}>
                <img src={c.thumb} alt={c.name} />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        )
      }
    </div>
  )
}
