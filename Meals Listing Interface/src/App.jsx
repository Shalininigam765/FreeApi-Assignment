import { useState } from 'react'
import CategoryPage from './CategoryPage'
import MealListPage from './MealListPage'
import MealDetail from './MealDetail'

export default function App() {
  const [category, setCategory] = useState(null)
  const [meal, setMeal] = useState(null)

  if (meal) return <MealDetail meal={meal} onBack={() => setMeal(null)} />
  if (category) return <MealListPage category={category} onSelect={setMeal} onBack={() => setCategory(null)} />
  return <CategoryPage onSelect={setCategory} />
}
