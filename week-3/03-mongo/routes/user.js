const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");


router.post('/signup', async(req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
        })

    res.json({
        message: "User signup successful"
    });
    })


router.get('/courses', async(req, res) => {

    // Implement listing all courses logic
    const response = await Course.find({});

    res.json({
        courses :response
    });

});

router.post('/courses/:courseId', userMiddleware,async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
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

router.get('/purchasedCourses', userMiddleware, async(req, res) => {


  
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })

});

module.exports = router