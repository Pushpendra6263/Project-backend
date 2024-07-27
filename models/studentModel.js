const mongoose = require('mongoose');
// const { required } = require('nodemon/lib/config');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const studentModel = new mongoose.Schema(

    {
        firstname: {
            type: String,
            required: [true, "First Name is Required"],
            minLength: [3, "First Name Should be Atleast 3 Character Long"]
        },

        lastname: {
            type: String,
            required: [true, "Last Name is Required"],
            minLength: [3, "Last Name Should be Atleast 3 Character Long"]
        },

        avatar: {
            type: Object,
            default: {
                fileId: "",
                url: "https://images.unsplash.com/photo-1696791474535-dfb6019e55e9?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
 
        contact: {
            type: String,
            required: [true, "Contact is Required"],
            minLength: [10, "Contact Should be Atleast 10 Character Long"],
            maxLength: [10, "Contact Must Not Exceed 10 Character"]
        },
        city: {
            type: String,
            required: [true, "Contact is Required"],
            minLength: [3, "Contact Should be Atleast 3 Character Long"],
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Others"]
        },

        email: {
            type: String,
            unique: true,
            required: [true, "Email is Required"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address'
            ],
        },

        password: {
            type: String,
            select: false,
            maxLength: [15, "Password should not exceed more than 15 characters"],
            minLength: [8, "Password should have atleast 8 characters"],
            // match : [
            //     regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
            // ]
        },

        resetPasswordToken: {
            type: String,
            default: "0",
        },

        resume : {
            education : [],
            jobs : [],
            internships : [],
            responsibilities : [],
            courses : [],
            projects : [],
            skills : [],
            accomplishments : [],


        },

        internship: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'internship' }
        ],
 
        job: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'job' }
        ],

    },
    
    { timestamps: true }
    
);


studentModel.pre("save", function () {

    if (!this.isModified("password")) {
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);

});

studentModel.methods.comparepassword = function (password) {

    return bcrypt.compareSync(password, this.password);

}

studentModel.methods.getjwttoken = function () {

    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

const Student = mongoose.model("student", studentModel);

module.exports = Student; 