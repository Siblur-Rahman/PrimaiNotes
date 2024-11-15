// import phones from './phones.json';
const express = require('express')
// const phones = require(phones)
const phones = require('./phones.json')
const app = express()
const cors = require('cors');
const port = 5001

app.use(cors());



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})