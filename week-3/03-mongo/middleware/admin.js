
const {Admin} = require('../db/index');


// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // username

    const username = req.body.username;
    const password = req.body.password;
    Admin.findOne({
        username: username,
        password: password
    }).then(function(value){
        if(value){
            next();
    }else{
        res.status(403).json({
            message: "You does nto exits"
        })
    }})
}

module.exports = adminMiddleware;