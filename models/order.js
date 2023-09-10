const mongoose = require("mongoose")

const Order = mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
    datetime: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Order", Order)