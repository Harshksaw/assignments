const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

const {Admin} = require('../db/index');

router.post('/signup', async(req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })
      
    res.json({
            message: "Admin signup successful"
        });

 



});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;