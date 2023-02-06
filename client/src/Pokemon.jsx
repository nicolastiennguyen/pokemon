import React from 'react'
import { useEffect, useState } from 'react'

const Pokemon = ({name, url}) => {

  const [data, setData] = useState('')

  useEffect(() => {
    fetchData()
  }, [data])

  const fetchData = async () => {
    await fetch(url)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(e => console.log(e))
  }

  if (data && data.sprites.front_default) {
    return (
      <div>
        {name}
        <img src = {data.sprites.front_default} />
      </div>
    )
  }
}

export default Pokemon