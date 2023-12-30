const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic

    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
        })

    res.json({
        message: "User signup successful"
    });


});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = User.findOne({
        username,
        password
    })
    if(user){

        const token = jwt.sign({username: username},JWT_SECRET )

        res.json({
            token
        })
    }else{
        res.status(401).send("Wrong email or password")
    
    }

});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});

    res.json({
        courses :response
    });

});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const username = req.username;
    console.log(username);
    const courseId = req.params.courseId;
    try {
        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchasedCourses : courseId
            }
        })
        res.json({
            message: "Purchase complete!"
        })
        
    } catch (error) {
        console.log(error);
        
    }


});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router