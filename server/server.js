import getConfig from './config/config.js'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import path from 'path'

// routes
import Products from './routes/products.js'

getConfig()
const app = express()

// intializers
app.use(bodyParser.json())
app.use(Products)

// db connection
// mongoose.connect(
//   process.env.URLDB,
//   { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
//   (err, res) => {
//     if (err) throw err
//     console.log("connected to database")
//   }
// )

// start server
app.listen(process.env.PORT, () => {
  console.log(`escuchando puerto ${process.env.PORT}`)
})
