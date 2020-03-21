const Discount = require('../models/Discount')
const User = require('../models/User')

const discountsController = require('./discountsController')
const cleaningRequestsController = require('./cleaningRequestsController')

const basePrice = 50

module.exports = {

    // ************** //
    //  CHECK  PRICE  //
    // ************** //
    async price(req, res) {
        const { date, duration, user_id } = req.body
        price = basePrice * duration

        let discount = await Discount.find({ user_id: user_id })
        if (discount.length > 0) {
            var { bestPrice, bestDiscountId, bestDiscountRate } = await discountsController.bestDiscountFinder(discount, price)
        }

        return res.json({
            date,
            duration,
            user_id,
            price,
            bestPrice,
            bestDiscountId,
            bestDiscountRate,
        })
    },
    // ************** //



    // ************** //
    // REQUEST ROUTES //
    // ************** //
    async requests(req, res) {
        response = await cleaningRequestsController.registerCleaning(req, res)
        return res.json( response ) 
    },
    async getRequests(req, res) {
        response = await cleaningRequestsController.listCleaning(req, res)
        return res.json( response )
    },
    async deleteRequests(req, res) {
        response = await cleaningRequestsController.deleteCleaning(req, res)
        return res.json( response )
    },
    async patchRequests(req, res) {
        response = await cleaningRequestsController.patchCleaning(req, res)
        return res.json( response )
    },
    async putRequests(req, res) {
        response = await cleaningRequestsController.replaceCleaning(req, res)
        return res.json( response )
    },
    // ************** //



    // ************** //
    // CREATE DISCTS  //
    // ************** //
    async discounts(req, res) {
        let response = await discountsController.createDiscounts(req, res)
        return res.json(response.data)
    },
    // ************** //

    // ************** //
    // CREATE USER_ID //
    // ************** //
    async signin(req, res) {
        const { email } = req.body
        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({ email })
        }
        return res.json(user)
    }
    // ************** //
}