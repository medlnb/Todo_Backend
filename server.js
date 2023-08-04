const express = require("express")
const cors = require("cors")
const path = require("path")
const mongoose = require("mongoose")
require("dotenv").config()
const Notesrouter = require("./Routers/Notes")
const Authrouter = require('./Routers/User')

const app = express()

app.use(express.json())
app.use(cors())


app.use("/api/notes", Notesrouter)
app.use("/api/user", Authrouter)

mongoose.connect(process.env.MONGO_URI)
.then(
  app.listen(process.env.PORT, () => {
    console.log(`connected to db & listening to ${process.env.PORT}`)
})  )

