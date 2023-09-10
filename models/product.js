const mongoose = require("mongoose")

const Product = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isOnSale: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Product", Product)