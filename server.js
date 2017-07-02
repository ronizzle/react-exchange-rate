const express = require('express')
const fs = require('fs')
const sqlite = require('sql.js')
const sqlFile = fs.readFileSync('db/films.sqlite')
const db = new sqlite.Database(sqlFile)
const app = express()

app.set('port', process.env.PORT || 3001)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.get('/api/rates', (request, response) => {
})

app.listen(app.get("port"), () => {
  console.log(`Server running at ${app.get("port")}`);});
