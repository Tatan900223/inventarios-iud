const express = require('express')
const { getConnection } = require('./db/db-connection-mongo')
const app = express()
const port = 3000

getConnection();

app.use(express.json())

app.use('/usuario', require('./router/usuario'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
