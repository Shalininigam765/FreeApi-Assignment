import { useState, useEffect } from 'react'

const url = 'https://api.freeapi.app/api/v1/public/randomjokes/joke/random'

function App() {
  const [jokes, setJokes] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const fetchJoke = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch the joke');
      }

      const data = await response.json();
      console.log(data.data);
      setJokes(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchJoke();
  }, []);

  return (
      <div className= 'main-container' style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Joke Teller </h2>
        <p id='caption'> Take some time to laugh!</p>

        <div style={{ minHeight: '80px', margin: '20px' }}>
          {loading && <p>Loading funny business...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          
          {!loading && jokes && (
            <div className='joke-container'>
              <p className='joke-text'>{jokes.content}</p>
            </div>
          )}
        </div>

        <button onClick={fetchJoke} disabled={loading}>
          {loading ? 'Fetching...' : 'Get Random Joke'}
        </button>
      </div>

  )
}

export default App
