const {JWT_SECRET} = require("../config");

const jwt = require("jsonwebtoken");
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const jwttoken = req.headers.authorization.split(" ")[1]

    const decoded = jwt.verify(jwttoken, JWT_SECRET)

    if(decoded.username){
        req.username = decoded.username;
        next();
    }
    else{
        res.status(401).send("Unauthorized user")
    }


}

module.exports = userMiddleware;