process.__dirname = __dirname

const express = require("express")
const fileupload = require("express-fileupload")
const path = require("path")
const app = express()

app.use(express.static(path.join(process.__dirname, "public")))
app.use(express.urlencoded({ extended: false }))
app.use(fileupload())

app.use("/", require("./ps-kovak"))

app.listen(3000, () => {
    console.log('http://localhost:3000')
})