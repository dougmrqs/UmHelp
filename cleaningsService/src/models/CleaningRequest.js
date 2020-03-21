const mongoose = require('mongoose')

const cleaningRequestSchema = new mongoose.Schema({
    date: Number,
    duration: Number,
    user_id: String,
})

module.exports = mongoose.model('CleaningRequest', cleaningRequestSchema)