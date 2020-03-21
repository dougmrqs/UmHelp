const cleaningRequest = require('../models/CleaningRequest')
const User = require('../models/User')
const Discount = require('../models/Discount')

const basePrice = 50

module.exports = {
    async bestDiscountFinder(discountList, basePrice) {
        let bestPrice = basePrice
        let bestDiscountId = 0
        let bestDiscountRate = 0
        discountList.forEach(function callback(discount, index, array) {
            if (discount.type === "%") {
                if (price * discount.value < bestPrice) {
                    bestPrice = price * discount.value
                    bestDiscountId = discount._id
                    bestDiscountRate = discount.value * 100 + " %"
                }
            }
            if (discount.type === "abs") {
                if (price - discount.value < bestPrice) {
                    bestPrice = price - discount.value
                    bestDiscountId = discount._id
                    bestDiscountRate = "R$ " + discount.value
                }
            }
            if (bestPrice < 0) {
                bestPrice = 0
            }
        })
        return { bestPrice, bestDiscountId, bestDiscountRate }
    },

    async createDiscounts(req, res) {
        let { type, value, user_id } = req.body

        if (type === "%") {
            if (value >= 1) {
                value = 1 - (value / 100)
            }
            else {
                value = value
            }
        }
        else {
            type = "abs"
            value = value
        }

        const discount = await Discount.create({ type, value, user_id })
        return discount
    }
}