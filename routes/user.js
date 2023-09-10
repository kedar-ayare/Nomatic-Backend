const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/user")

const tokenVerify = require("../middlewares/auth");
const { config } = require('dotenv');


// Endpoint for user to login into the app
router.post('/login', async (req, res) => {
    let creds = req.body
    if (creds.email == "" || creds.email == undefined || creds.email == null) {
        res.send({ err: "Email required" })
    } else {
        try {
            var user = await User.findOne({ email: creds.email })
        } catch (error) {
            res.send({ err: "Error connecting with Database" })
        }

        if (user == null) {
            res.send({ err: "Couldn't find user with the same email" })
        } else if (user.password == creds.password) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE, { expiresIn: '90d' })
            res.send({ token, role: user.role })
        } else {
            res.send({ err: "Invalid Credentials" })
        }
    }
})


// Endpoint that adds product to a user's cart
router.post('/addCart', tokenVerify, async (req, res) => {
    try {
        const user = await User.findById(req.User);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart.push(req.body.prodId);
        await user.save();

        res.json({ msg: "Added to Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})


// Endpoint that removes product from a user's cart
router.post('/deleteCart', tokenVerify, async (req, res) => {
    try {
        var user = await User.findById(req.User);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user.cart)
        const indexToRemove = user.cart.indexOf(req.body.prodId);

        if (indexToRemove !== -1) {
            user.cart.splice(indexToRemove, 1);
        } else {
            return res.status(404).json({ message: 'Product not found in Cart' });
        }
        await user.save();

        res.json({ msg: "Removed from cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})


// Endpoint that gets cart of a user
router.get('/cart', tokenVerify, async (req, res) => {
    const user = await User.findById(req.User)
    console.log(user)
    res.send(user.cart)
})
module.exports = router;