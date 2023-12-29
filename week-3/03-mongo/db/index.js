const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://harshkumar:programmer@cluster0.nxozrfb.mongodb.net/?retryWrites=true&w=majority');

// Define schemas
const AdminSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,


});

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    purchasedCourses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}