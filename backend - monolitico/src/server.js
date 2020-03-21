const port = 3005

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const gatewayController = require('./controllers/gatewayController')

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
app.post("/requests", gatewayController.requests)
app.get("/requests", gatewayController.getRequests)
app.delete("/requests", gatewayController.deleteRequests)
app.patch("/requests", gatewayController.patchRequests)
app.put("/requests", gatewayController.putRequests)
app.post("/discounts", gatewayController.discounts)
// app.post("/discounts", gatewayController.discounts)

app.post("/signin", gatewayController.signin)
// ********** //

app.listen(port, () => {
    console.log(`Server running @ port ${port}`)
})