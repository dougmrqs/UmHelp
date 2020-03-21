const mongoose = require('mongoose')

const discountSchema = new mongoose.Schema({
    type: String,
    value: Number,
    user_id: String
})

module.exports = mongoose.model('Discount', discountSchema)