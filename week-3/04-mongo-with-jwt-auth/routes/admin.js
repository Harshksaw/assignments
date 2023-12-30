const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken") 
const { Admin, Course } = require('../db/index');

router.post('/signup', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: "Admin created successfully"
    });


});
router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.find({
        username,
        password
    })
    if(admin){

        const token = jwt.sign({username: username},JWT_SECRET )

        res.json({
            token
        })
    }else{
        res.status(401).send("Wrong email or password")
    
    }

});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // zod
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })

});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic

    const courses =await Course.find({})

    res.json({
        courses
    })


});

module.exports = router;