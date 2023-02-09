import { useEffect, useState } from 'react'
import './App.css'
import PokeList from './PokeList'
import Pagination from './Pagination'
import Search from './Search'

function App() {
  const [loading, setLoading] = useState(false)
  const [pokeData, setPokeData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(5)
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState('')

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

    // server-side request - helps with CORS if API key is involved in API's URL
    try {
      const limit = 20
      const api_url = `http://localhost:9000/pokemon/${limit}`
      const response = await fetch(api_url)
      const json = await response.json()
      setPokeData(json.results)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
    const pokemonNames = []
    for (let i = 0 ; i < currentPosts.length; i++) {
      pokemonNames.push(currentPosts[i].name)
    }
    let filteredPokemon = pokemonNames.filter((pokemon) => {
      return pokemon.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setFiltered(filteredPokemon.toString().split(''))
    if (e.target.value === '') {
      setFiltered('')
    }
  }

  return (
    <>
      {loading ? (
        <div> Loading... </div>
      ) : (
        <div className="App">
          <input type="text" onChange={handleChange}/>
          Here's your filtered pokemon: {filtered}
          <PokeList pokeData={currentPosts} />
          <Pagination
          totalPosts={pokeData.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          />
          <Search/>
        </div>
      )}
    </>
  )
}

export default App
