import React, { useEffect, useState } from 'react'
import './App.css'
import Pagination from './Pagination'

function App() {
  const [memes, setMemes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(5)

  const lastPageIndex = currentPage * postsPerPage
  const firstPageIndex = lastPageIndex - postsPerPage
  const currentPosts = memes.slice(firstPageIndex, lastPageIndex)

  // useEffect takes in two arguments
  // the first argument is the effect itself
  // and the second argument is the array of dependencies on which the effects depend on
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    await fetch(`https://api.imgflip.com/get_memes`)
    .then((response) => response.json())
    .then((json) => setMemes(json.data.memes))
    .catch((error) => console.log('error fetching data from API', error))
  }

  return (
    <div className="App">
      {memes ?
        currentPosts.map((meme, index) => {
          return <img key={index} src={meme.url} className="memeImg"/>
        })
        : null
      }
      <Pagination
      totalPosts={memes.length}
      postsPerPage={postsPerPage}
      setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default App