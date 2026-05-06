import { useState, useEffect } from 'react'

const url = 'https://api.freeapi.app/api/v1/public/randomproducts'

function App() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)

    try{
      const res = await fetch(url)
      const data = await res.json()
      console.log(data.data.data)
      setProducts(data.data.data)
    }catch(error){
      throw new Error("Error:", error.message)
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      
      <div className='product-container'>
        <h1> Product Lists</h1>
        <div className='product-grid'> {products.map((product) => (
          <div className='product-card'> 
            <div className='product-image'> 
              <img src={product.thumbnail} alt={product.title} /> 
              <div className='price'> ${product.price} </div>
            </div>
          <div className='product-info'>
            <div className='title' key={product.id}> {product.title} </div> 
            <div className='category'> Category: {product.category} </div>
            <div className='brand'> Brand: {product.brand} </div>
            <div className='description'> <b>Description: </b>{product.description}</div>
          </div>
          </div>)
          )}
        </div>

        <div className='loading'> {loading ? "Loading..." : null}</div>
        <div className='error'> {error ? "Error occurred while fetching products." : null}</div>

      </div>
    </>
  )
}

export default App
