const mongoose = require('mongoose');


const internshipModel = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId, ref: 'employee'
        },

        students: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'student'
        }],

        profile: {
            type: String,
            // required: [true, "Profile is Required"],
            minLength: [3, "First Name Should be Atleast 3 Character Long"]
        },

        skills: {
            type: String,
            // required: [true, "Skills are Required"],
        },

        internshiptype: {
            type: String,
            // required: [true, "Type is Required"],
            enum: ["In Office", "Remote"]
        },

        openings: {
            type: Number,
            // required: [true, "Openings are Required"],
        },
        organizationname: {
            type: String
        },

        start:{
            type : String,
            // enum : [
            //     "Immediate",
            //     "immediate",
            //     "After a week",
            //     "after a week",
            // ]
        },

        duration: {
            type: String,
            // required: [true, "Duration is Required"],
        },

        responsibility: {
            type: String,
            // required: [true, "Resposibility is Required"],
        },

        stipend: {
            status: {
                type: String,
                // enum: [
                //     "Fixed",
                //     "Negotiable",
                //     "Performance based",
                //     "Unpaid",
                //     "fixed",
                //     "negotiable",
                //     "performance based",
                //     "unpaid"
                // ]
            },
            // required: [true, "Stipend is Required"],
            amount: Number
        },

        location : String,

        perks: String,

        assesments: String,

    },
    { timestamps: true }
);

const Internship = mongoose.model("internship", internshipModel);

module.exports = Internship; 