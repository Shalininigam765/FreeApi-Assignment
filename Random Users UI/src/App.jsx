import { useEffect, useState } from 'react'

const url = 'https://api.freeapi.app/api/v1/public/randomusers'

function App() {
  const [users, setUsers] = useState([])
  const [errors, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {

      setLoading(true)
      try{
        const res = await fetch(url)

        if (!res.ok){
          throw new Error("Fetch request failed")
        }

        const data = await res.json()
        console.log(data.data.data[0])
        setUsers(data.data.data)
      }
      catch(error){
        setError(error)
        throw new Error(`Error: ${error.message}`)
      }
      finally{
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <>
      <div>
        <h1 className='title'>Random User Directory</h1>
        {loading && <p className='status'>Loading...</p>}
        {errors && <p className='status error'>Something went wrong.</p>}
        <div className='container'>
          {users.map((user) => (
            <div
              className={`user-card ${activeId === user.login.uuid ? 'active' : ''}`}
              key={user.login.uuid}
              onClick={() => setActiveId(activeId === user.login.uuid ? null : user.login.uuid)}
            >
              <img src={user.picture.medium} alt={user.name.first} />
              <h3>{Object.values(user.name).join(' ')}</h3>
              <p className='email'>{user.email}</p>
              <span className='badge'>{user.gender}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
