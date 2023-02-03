const express = require('express')
const app = express()
app.use(express.json())

// respond with "hello world" when a GET request is made to the homepage
app.get('/pokemon', (req, res) => {
  res.send('hello world')
})

let PORT = 9000
app.listen(PORT, () => console.log(`listening on port ${PORT}`))