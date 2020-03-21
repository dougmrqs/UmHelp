const axios = require('axios')
const cleaningRequestController = require('./cleaningRequestsController')
const basePrice = 50


// # ************* #
// # DISCOUNTS API #
// # ************* #
baseURL = "http://localhost:3003"
// # POST /bestdiscount finds the best discount
// # POST /newdiscount posts a new discount on db
// # POST /usediscount deletes the best discount to be used
// # ************* #

module.exports = {

    // ************** //
    //  CHECK  PRICE  //
    // ************** //
    async price(req, res) {
        const { date, duration, user_id } = req.body
        price = basePrice * duration
        req.body.price = price
        await axios.post(baseURL+"/bestdiscount", req.body)
            .then(function (response) {
                return res.json(response.data)
            })
    },
    // ************** //

    // ************** //
    //  REQ CLEANING  //
    // ************** //
    async requestCleaning(req, res) {
        const { date, duration, user_id } = req.body
        price = basePrice * duration
        req.body.price = price
        price = await axios.post(baseURL+"/usediscount", req.body)
            .then(async function (response, price) {
                console.log(response.data)
                response = await cleaningRequestController.registerCleaning(response.data)
                console.log(response.data)
                return res.json( response )
            })
    },
    async getCleaning(req, res) {
        const { date, duration, user_id } = req.body
        price = basePrice * duration
        req.body.price = price
        price = await axios.post(baseURL+"/usediscount", req.body)
            .then(async function (response, price) {
                console.log(response.data)
                response = await cleaningRequestController.registerCleaning(response.data)
                console.log(response.data)
                return res.json( response )
            })
    },
    async putCleaning(req, res) {
        const { date, duration, user_id } = req.body
        price = basePrice * duration
        req.body.price = price
        price = await axios.post(baseURL+"/usediscount", req.body)
            .then(async function (response, price) {
                console.log(response.data)
                response = await cleaningRequestController.registerCleaning(response.data)
                console.log(response.data)
                return res.json( response )
            })
    },
    async patchCleaning(req, res) {
        const { date, duration, user_id } = req.body
        price = basePrice * duration
        req.body.price = price
        price = await axios.post(baseURL+"/usediscount", req.body)
            .then(async function (response, price) {
                console.log(response.data)
                response = await cleaningRequestController.registerCleaning(response.data)
                console.log(response.data)
                return res.json( response )
            })
    }
    // ************** //
}