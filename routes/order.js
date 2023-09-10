const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/user")
const Order = require("../models/order")

const tokenVerify = require("../middlewares/auth");
const { config } = require('dotenv');


router.post('/', tokenVerify, async (req, res) => {
    if (req.User !== undefined) {
        const idArray = req.body.prodsIds;
        const prices = req.body.prices
        var totalAmount = 0
        for (var i = 0; i < prices.length; i++) {
            totalAmount = totalAmount + prices[i]
        }
        console.log(typeof totalAmount)
        if (idArray.length > 0) {
            console.log(totalAmount)
            const order = new Order({
                products: idArray,
                datetime: new Date(),
                totalAmount: totalAmount
            })
            var newOrder = await order.save()
            const user = await User.findOne({ _id: req.User })
            user.orders.push(newOrder._id)
            user.cart = []
            await user.save()
            res.send({ msg: "Confirmed" })
        }
        else {
            res.send({ err: "Cart empyt" })
        }
    }
})


router.get('/', tokenVerify, async (req, res) => {
    if (req.User != undefined) {
        const user = await User.findOne({ _id: req.User }).populate("orders")
        console.log(user)
        res.send({ orders: user.orders })
    }
})
module.exports = router;