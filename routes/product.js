const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/user")
const Product = require("../models/product")

const tokenVerify = require("../middlewares/auth");
const { config } = require('dotenv');


router.get('/', tokenVerify, async (req, res) => {
    if (req.User == undefined) {
        res.send({ err: "Token Invalid or Missing" })
    }
    else {
        const prods = await Product.find()
        console.log(prods)
        res.send(prods)
    }

})


router.post('/saleStart', tokenVerify, async (req, res) => {
    if (req.User == undefined) {
        res.send({ err: "Token Invalid or Missing" })
    } else {
        try {
            var user = await User.findOne({ _id: req.User })
        } catch (err) {
            console.log(err)
        }
        if (user == null) {
            res.send({ err: "Token expired or User deleted from database" })
        } else {
            console.log(user)
            if (user.role != 'admin') {
                res.send({ err: "Current User is not Authorised to access this route" })
            } else {
                await Product.updateOne(
                    { _id: req.body.prodId },
                    {
                        isOnSale: req.body.saleDate,
                        discount: req.body.discount
                    });
                res.send("All Okay")
            }
        }
    }


})

module.exports = router