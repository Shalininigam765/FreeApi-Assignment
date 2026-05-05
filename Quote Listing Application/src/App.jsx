import { useEffect, useState } from 'react';

const url = 'https://api.freeapi.app/api/v1/public/quotes';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setQuotes(data.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  return (
    <div className="quote-gallery">
      <div className="gallery-header">
        <h1>Quotes Gallery</h1>
        <p>A collection of words worth remembering</p>
        <button className="theme-toggle" onClick={() => setDark(d => !d)}>
          {dark ? '☀ Light' : '☾ Dark'}
        </button>
      </div>

      {loading && <p className="status-message">Loading quotes...</p>}
      {error && <p className="error-message">Something went wrong: {error}</p>}
      {!loading && !error && quotes.length === 0 && (
        <p className="status-message">No quotes found.</p>
      )}

      <div className="quotes-grid">
        {!loading && !error && quotes.map((quote) => (
          <div key={quote.id} className="quote-card">
            <span className="quote-mark">"</span>
            <p className="quote-text">{quote.content}</p>
            <p className="quote-author">— {quote.author}</p>
            {quote.tags?.length > 0 && (
              <div className="tags">
                {quote.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
