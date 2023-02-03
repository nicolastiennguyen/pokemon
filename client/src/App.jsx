import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
    })
    .catch(e => {
      console.log(e)
    })
  })

  return (
    <div className="App">
      Hello World
    </div>
  )
}

export default App
