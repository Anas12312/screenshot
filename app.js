const express = require('express')
const path = require('path')
const app = express()

app.use('/', express.static(path.join(__dirname, '/client/dist')))


app.listen(3000, () => {
    console.log("App running in port: 3000")
})