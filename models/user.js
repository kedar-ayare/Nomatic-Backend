const mongoose = require("mongoose")

const User = mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    role: {
        type: String
    }

})

module.exports = mongoose.model("User", User)