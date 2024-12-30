const express = require('express')
const router = express.Router()
const { Buffer } = require("buffer")

const helper = require("./helper")

router.post("/generate", (req, res) => {
    try {
        if (!req.files) {
            res.status(500).send("file upload error")
            return
        }

        const psCode = req.files.file.data.toString()
        const { method, base64: isBase64 } = req.body

        // if (psCode.includes("\n")) {
        //     res.status(500).send("multiline string found. single line needed")
        //     return
        // }

        let payload = helper[`${method}Method`](psCode)
        if (isBase64) payload = `powershell -e ${Buffer.from(payload, "utf16le").toString("base64")}`
        res.send(payload)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})


module.exports = router