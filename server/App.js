import express from 'express'
import fetch from 'node-fetch'
const app = express()
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


// server-side request
app.get('/pokemon/:limit', async (req, res) => {
  const limit = req.params.limit
  const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  const fetch_res = await fetch(URL)
  const json = await fetch_res.json()
  res.send(json)
})

let PORT = 9000
app.listen(PORT, () => console.log(`listening on port ${PORT}`))