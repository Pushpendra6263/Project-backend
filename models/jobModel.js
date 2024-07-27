const mongoose = require('mongoose');


const jobModel = new mongoose.Schema(
    {

        employee: {
            type: mongoose.Schema.Types.ObjectId, ref: 'employee'
        },

        students: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'student'
        }],

        title: {
            type: String,
        },

        organizationname: {
            type: String
        },

        location: {
            type: String
        },

        skills: [{
            type: String,
        }],

        jobtype: {
            type: String,
            enum: ["In Office", "Remote"]
        },

        openings: Number,

        description: String,

        preferences: String,

        salary: Number,

        perks: String,

        assesments: String,

    },
    { timestamps: true }
);

const Job = mongoose.model("job", jobModel);

module.exports = Job; 