export default function MealDetail({ meal, onBack }) {
  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ing = meal[`strIngredient${i + 1}`]
    const measure = meal[`strMeasure${i + 1}`]
    return ing?.trim() ? { ing, measure: measure?.trim() || '' } : null
  }).filter(Boolean)

  return (
    <div className="detail-page">
      <div className="detail-back">
        <button className="back-btn" onClick={onBack}>← Back to list</button>
      </div>

      <div className="meal-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="meal-meta">
          <h1>{meal.strMeal}</h1>
          <div className="meal-meta-tags">
            <span className="tag tag-area">{meal.strCategory}</span>
            <span className="tag tag-area">{meal.strArea}</span>
            {meal.strTags && meal.strTags.split(',').map(t => (
              <span key={t} className="tag">{t.trim()}</span>
            ))}
          </div>
          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="yt-link">
              ▶ Watch on YouTube
            </a>
          )}
        </div>
      </div>

      <section>
        <h2>Ingredients</h2>
        <ul className="ingredients">
          {ingredients.map(({ ing, measure }) => (
            <li key={ing}><strong>{ing}</strong>{measure && ` — ${measure}`}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Instructions</h2>
        <div className="instructions">
          {meal.strInstructions.split(/\r\n|\n/).filter(Boolean).map((step, i) => (
            <p key={i}>{step}</p>
          ))}
        </div>
      </section>

      {meal.strSource && (
        <a href={meal.strSource} target="_blank" rel="noreferrer" className="source-link">
          View Original Source ↗
        </a>
      )}
    </div>
  )
}
