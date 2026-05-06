import { useState, useEffect } from 'react'

const URL = 'https://api.freeapi.app/api/v1/public/meals'

export default function MealSelector({ onSelect }) {
  const [meals, setMeals] = useState([])
  const [category, setCategory] = useState('')
  const [mealId, setMealId] = useState('')
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
      setMeals(all)
      setLoading(false)
    }
    fetchAll()
  }, [])

  const categories = [...new Set(meals.map(m => m.strCategory))].sort()
  const filtered = category ? meals.filter(m => m.strCategory === category) : meals

  const handleGo = () => {
    const meal = meals.find(m => String(m.idMeal) === mealId)
    if (meal) onSelect(meal)
  }

  return (
    <div className="selector-page">
      <h1>🍽️ Meal Recipes</h1>
      <p>Select a category and meal to view its recipe</p>

      {loading ? <p>Loading meals...</p> : (
        <div className="selector-form">
          <div className="field">
            <label>Category</label>
            <select value={category} onChange={e => { setCategory(e.target.value); setMealId('') }}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="field">
            <label>Meal</label>
            <select value={mealId} onChange={e => setMealId(e.target.value)}>
              <option value="">Select a meal</option>
              {filtered.map(m => <option key={m.idMeal} value={m.idMeal}>{m.strMeal}</option>)}
            </select>
          </div>

          <button disabled={!mealId} onClick={handleGo}>View Recipe →</button>
        </div>
      )}
    </div>
  )
}
