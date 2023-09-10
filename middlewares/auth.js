const jwt = require("jsonwebtoken");

async function tokenVerify(req, res, next) {
    console.log(req.headers)
    try {
        // no token
        if (!req.headers.token) {
            req.auth = { isAuthenticated: false };
            console.log("unauthenticated (no jwt)");
            res.json({ err: "No Token" })
        }


        try {
            const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRETE);
            req.User = decoded.id;
            return next();
        } catch (err) {
            console.log(err)
            res.json({ err: "Error Validating the User" })
        }
    } catch (err) {
        res.json({ err: err })
    }

}



module.exports = tokenVerify;