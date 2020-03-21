const cleaningRequest = require('../models/CleaningRequest')
const Discount = require('../models/Discount')

const discountsController = require ('./discountsController')

const basePrice = 50


module.exports = {
    async registerCleaning(req, res) {
        const { date, duration, user_id } = req.body
        price = basePrice * duration

        let discount = await Discount.find({ user_id: user_id })
        if (discount.length > 0) {
            var { bestPrice, bestDiscountId, bestDiscountRate } = await discountsController.bestDiscountFinder(discount, price)
            await Discount.deleteOne({ _id: bestDiscountId })
        }

        response = await cleaningRequest.create({ date, duration, user_id })
        return ({ response, price, bestPrice })
    },

    async replaceCleaning(req,res){
        const { date, duration, user_id } = req.body
        then = await cleaningRequest.findOneAndReplace({ _id: req.body.id }, { date, duration, user_id })
        now = await cleaningRequest.findById(req.body.id)
        return {then, now}
    },
    async patchCleaning(req,res){
        then = await cleaningRequest.findOneAndUpdate({ _id: req.body.id }, req.body)
        now = await cleaningRequest.findById(req.body.id)
        return { then, now }
    },
    async deleteCleaning(req, res){
        let response = await cleaningRequest.findOne({ _id: req.body.id })
        if (response) {
            response.remove()
            response = {deleted: req.body.id}
        }
        else {
            response = "Document not found or already deleted"
        }
        return response
    },
    async listCleaning(req, res) {
        response = await cleaningRequest.find()
        return response
    }
}