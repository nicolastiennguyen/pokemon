import React, { useEffect, useState }  from 'react'

const Search = () => {

  const [searchInput, setSearchInput] = useState('')
  const [searchedPokemonData, setSearchedPokemonData] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const fetchPokemon = async (e) => {
    e.preventDefault()
    await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}/`)
    .then((res) => res.json())
    .then((data) => setSearchedPokemonData(data))
    .catch((err) => {
      console.log(err)
      setSearchedPokemonData('')
    })
  }

  return (
    <div>
      <form onSubmit={fetchPokemon}>
        <input type='text' id='searchInput' onChange={handleChange}/>
        <input type='submit' value='Go!'/>
      </form>
      <>
        {searchedPokemonData && searchedPokemonData.sprites.front_default ?
        <img src={searchedPokemonData.sprites.front_default} /> : <div> Loading... </div>}
      </>
    </div>
  )
}

export default Search