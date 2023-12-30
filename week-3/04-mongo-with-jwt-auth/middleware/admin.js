// Middleware for handling auth
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken")
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const jwttoken = req.headers.authorization.split(" ")[1]

    const decoded = jwt.verify(jwttoken, JWT_SECRET)
    try{
        if(decoded){
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }

    }catch(err){
        res.status(401).send("Unauthorized")
    }
 
  
}

module.exports = adminMiddleware;