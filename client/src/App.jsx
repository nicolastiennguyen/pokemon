import { useEffect, useState } from 'react'
import './App.css'
import PokeList from './PokeList'
import Pagination from './Pagination'

function App() {
  const [loading, setLoading] = useState(false)
  const [pokeData, setPokeData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(4)

  useEffect(() => {
    fetchData()
  }, [])

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = pokeData.slice(firstPostIndex, lastPostIndex)

  const fetchData = async () => {
    setLoading(true)

    /* client-side request:
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    .then(res => {
      return res.json()
    })
    .then(data => {
      setPokeData(data.results)
      setLoading(false)
    })
    .catch(e => {
      console.log(e)
      setLoading(false)
    })
    */

    // server-side request - helps with CORS if API key is involved in API_URL
    try {
      const api_url = `http://localhost:9000/pokemon`
      const response = await fetch(api_url)
      const json = await response.json()
      console.log(json.results)
      setPokeData(json.results)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {loading ? (
        <div> ... Loading ... </div>
      ) : (
        <div className="App">
          <PokeList pokeData={currentPosts} />
          <Pagination
          totalPosts={pokeData.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  )
}

export default App
