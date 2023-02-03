import React from 'react'
import Pokemon from './Pokemon'

const PokeList = ({pokeData}) => {
  if (pokeData) {
    return (
      <div>
        {pokeData.map((poke, index) => {
          return (
            <Pokemon key={index} name={poke.name}/>
          )
        })}
      </div>
    )
  }
}

export default PokeList