import { useEffect, useState } from 'react'
import './App.css'
import PokeList from './PokeList'

function App() {
  const [loading, setLoading] = useState(false)
  const [pokeData, setPokeData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
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
  }

  return (
    <>
      {loading ? (
        <div> ... Loading ... </div>
      ) : (
        <div className="App">
          <PokeList pokeData={pokeData} />
        </div>
      )}
    </>
  )
}

export default App
