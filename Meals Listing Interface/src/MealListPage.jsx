import { useState, useEffect } from 'react'

const URL = 'https://api.freeapi.app/api/v1/public/meals'

export default function MealListPage({ category, onSelect, onBack }) {
  const [meals, setMeals] = useState([])
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
      setMeals(all.filter(m => m.strCategory === category))
      setLoading(false)
    }
    fetchAll()
  }, [category])

  return (
    <div className="page meal-list-page">
      <header>
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div>
          <h1>{category}</h1>
          <p>{meals.length} meals found</p>
        </div>
      </header>

      {loading
        ? <div className="loader">Loading meals...</div>
        : (
          <div className="meal-list">
            {meals.map(meal => (
              <button key={meal.idMeal} className="meal-card" onClick={() => onSelect(meal)}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <div className="meal-card-info">
                  <h3>{meal.strMeal}</h3>
                  <div className="meal-card-tags">
                    <span className="tag">{meal.strArea}</span>
                    {meal.strTags && meal.strTags.split(',').slice(0, 2).map(t => (
                      <span key={t} className="tag">{t.trim()}</span>
                    ))}
                  </div>
                  <p>{meal.strInstructions.slice(0, 120).trim()}…</p>
                </div>
                <span className="arrow">→</span>
              </button>
            ))}
          </div>
        )
      }
    </div>
  )
}
