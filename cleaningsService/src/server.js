const port = 3002

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const gatewayController = require('./controllers/gatewayController')
const cleaningController = require('./controllers/cleaningRequestsController')

const app = express()

mongoose.connect('mongodb+srv://umhelp:aLf5jRStKPhdEhGR@omnistack-yregx.mongodb.net/umHelp?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ********** //
//   ROUTES   //
// ********** //
app.post("/price", gatewayController.price)
app.get("/getcleaning", cleaningController.listCleaning)
app.post("/requestcleaning", gatewayController.requestCleaning)
app.delete("/deletecleaning", cleaningController.deleteCleaning)
app.put("/putcleaning", cleaningController.replaceCleaning)
app.patch("/patchcleaning", cleaningController.patchCleaning)
// ********** //

app.listen(port, () => {
    console.log(`CLEANING - Server running @ port ${port}`)
})