const Discount = require('../models/Discount')
const discountsController = require('./discountsController')
const axios = require('axios')


module.exports = {

    // ************** //
    //  CHECK  PRICE  //
    // ************** //
    async price(req, res) {
        const { date, duration, user_id, price } = req.body
        let discount = await Discount.find({ user_id: user_id })
        if (discount.length > 0) {
            var { bestPrice, bestDiscountId, bestDiscountRate } = await discountsController.bestDiscountFinder(discount, price)
        }
        response = {
            date,
            duration,
            user_id,
            price,
            bestPrice,
            bestDiscountId,
            bestDiscountRate,
        }
        return res.json(response)
    },
    // ************** //


    // ************** //
    // CREATE DISCTS  //
    // ************** //
    async discounts(req, res) {
        // console.log(req.body)
        let response = await discountsController.createDiscounts(req, res)
        return res.json(response)
    },
    // ************** //
    

    // ************** //
    //   USE  DISCTS  //
    // ************** //
    async useDiscount(req, res) {
        const { date, duration, user_id, price } = req.body

        let discount = await Discount.find({ user_id: user_id })
        if (discount.length > 0) {
            var { bestPrice, bestDiscountId, bestDiscountRate } = await discountsController.bestDiscountFinder(discount, price)
            await Discount.deleteOne({ _id: bestDiscountId })
        }
        response = { date, duration, user_id, bestPrice, bestDiscountId }
        return res.json(response)
    },
    // ************** //
}