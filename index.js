
import express from 'express'
import bootstrap from './src/bootstrap.js'
const app = express()
const port = 3000
bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
