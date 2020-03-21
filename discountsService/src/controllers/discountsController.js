const Discount = require('../models/Discount')

const basePrice = 5000

module.exports = {
    async bestDiscountFinder(discountList, price) {
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
    },

    async putDiscount(req,res){
        const { type, value, user_id } = req.body
        then = await Discount.findOneAndReplace({ _id: req.body.id }, { type, value, user_id })
        now = await Discount.findById(req.body.id)
        return res.json({then, now})
    },
    async patchDiscount(req,res){
        then = await Discount.findOneAndUpdate({ _id: req.body.id }, req.body)
        now = await Discount.findById(req.body.id)
        return res.json({ then, now })
    },
    async deleteDiscount(req, res){
        let response = await Discount.findOne({ _id: req.body.id })
        if (response) {
            response.remove()
            response = {deleted: req.body.id}
        }
        else {
            response = "Document not found or already deleted"
        }
        return res.json(response)
    },
    async listDiscount(req, res) {
        response = await Discount.find()
        return res.json(response)
    }
}