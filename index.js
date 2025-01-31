import dbConnect from './db/connect.db.js'
import { setWebhook } from './function/tg.function.js'
import app from './app.js'
import 'dotenv/config'

const link = `http://localhost:${process.env.PORT}`

dbConnect()
    .then(() => {
        setWebhook()
    })
    .then(() => {
        app.use('/', (req, res) => {
            res.status(404).json({ status: "Not found" })
        })
        app.listen(process.env.PORT, () => {
            console.log("Visit at :", link)
        })
    })
    .catch(err => {
        console.log("Error From index.js",err)
    }) 