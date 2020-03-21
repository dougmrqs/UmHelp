const cleaningRequest = require('../models/CleaningRequest')


module.exports = {
    async registerCleaning(req, res) {
        const { date, duration, user_id, bestPrice } = req
        response = await cleaningRequest.create({ date, duration, user_id })
        price, bestPrice 
        return ( response )
    },

    async replaceCleaning(req,res){
        const { date, duration, user_id } = req.body
        then = await cleaningRequest.findOneAndReplace({ _id: req.body.id }, { date, duration, user_id })
        now = await cleaningRequest.findById(req.body.id)
        return res.json({then, now})
    },
    async patchCleaning(req,res){
        then = await cleaningRequest.findOneAndUpdate({ _id: req.body.id }, req.body)
        now = await cleaningRequest.findById(req.body.id)
        return res.json({ then, now })
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
        return res.json(response)
    },
    async listCleaning(req, res) {
        response = await cleaningRequest.find()
        return res.json(response)
    }
}