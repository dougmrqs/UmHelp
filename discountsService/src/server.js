const port = 3003

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const gatewayController = require('./controllers/gatewayController')
const discountController = require('./controllers/discountsController')
const app = express()

mongoose.connect('mongodb+srv://umhelp:aLf5jRStKPhdEhGR@omnistack-yregx.mongodb.net/umHelp?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ********** //
//   ROUTES   //
// ********** //
app.get("/getdiscount", discountController.listDiscount)
app.post("/newdiscount", gatewayController.discounts)
app.post("/bestdiscount", gatewayController.price)
app.post("/usediscount", gatewayController.useDiscount)

app.put("/putdiscount", discountController.putDiscount)
app.patch("/patchdiscount", discountController.patchDiscount)
app.delete("/deletediscount", discountController.deleteDiscount)
// ********** //

app.listen(port, () => {
    console.log(`DISCOUNTS - Server running @ port ${port}`)
})