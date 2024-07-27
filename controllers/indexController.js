const { catchErrors } = require("../middleware/catchErrors");
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const errorHandler = require("../utils/errorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendToken } = require("../utils/sendToken");
const path = require('path');
const { send } = require("process");
const imagekit = require('../utils/imageKit').initImageKit();



exports.currentUser = catchErrors(async (req, res, next) => {
    // const student = await Student.findById("65bdeef510f2e115c4af68c2").exec();
    const student = await Student.findById(req.id)
    .populate("job")
    .populate("internship")
    .exec();
    res.json({ student })
});

exports.homepage = catchErrors(async (req, res, next) => {
    res.json({ message: "Secure HomePage!" })
});

exports.studentsignup = catchErrors(async (req, res, next) => {
    const student = await new Student(req.body).save();
    // res.status(201).json(student);
    sendToken(student, 201, res);
});

exports.studentsignin = catchErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).select("+password").exec();

    if (!student)
        return next(
            new errorHandler("Student not found with this email address", 404)
        );

    const isMatch = student.comparepassword(req.body.password);

    if (!isMatch)
        return next(
            new errorHandler("Wrong Credentials", 500)
        );

    sendToken(student, 200, res);
    // res.json(student);

});

exports.studentsignout = catchErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "Successfully Signout" });
});

exports.studentsendmail = catchErrors(async (req, res, next) => {

    const student = await Student.findOne({ email: req.body.email }).exec();

    if (!student) {
        return next(
            new errorHandler("Student not found with this email address", 404)
        );
    };

    // const url = `${req.protocol}://${req.get("host")}/student/forgetlink/${student._id}`
    const url = Math.floor(Math.random() * 9000 + 1000);

    sendmail(req, res, next, url)
    student.resetPasswordToken = `${url}`;
    await student.save();
    // res.json({ message: "mail sent" })
    res.json({ student, url });

});

exports.studentforgetlink = catchErrors(async (req, res, next) => {

    const student = await Student.findOne({ email: req.body.email }).exec();

    if (!student) {
        return next(
            new errorHandler("Student Not Found With This Email Address", 404)
        );
    };

    if (student.resetPasswordToken === req.body.otp) {
        student.resetPasswordToken = "0";
        student.password = req.body.password;
        await student.save();
    } else {
        return next(
            new errorHandler("Invalid Reset Password Link! Please try again", 404)
        );
    }

    res.status(200).json({
        message: "Password have been successfully changed"
    })


});

exports.studentresetpassword = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.password = req.body.password;
    await student.save();

    sendToken(student, 201, res)

    // res.status(200).json({
    //     message: "Password Has Been Successfully Reset"
    // })


});

exports.studentupdate = catchErrors(async (req, res, next) => {

    await Student.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "Student Updated Successfully",
    })
});

exports.studentavatar = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.params.id).exec();

    const file = req.files.avatar;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    if (student.avatar.fileId !== "") {
        await imagekit.deleteFile(student.avatar.fileId)
    }

    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    });
    student.avatar = { fileId, url } 
    await student.save();
    res.status(200).json({
        success: true,
        message: "Profile uploaded"
    })
});


// -----apply interships----
exports.applyinternship = catchErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internship = await Internship.findById(req.params.internshipid).exec();

    student.internship.push(internship._id);
    internship.students.push(student._id);
    await student.save()
    await internship.save()

    res.json({ student, internship })
});

exports.readallinternships = catchErrors(async (req, res, next) => {
    const internships = await Internship.find().exec();

    res.status(200).json({ internships });
});


// -----apply jobs----
exports.applyjob = catchErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const job = await Job.findById(req.params.jobid).exec();

    student.job.push(job._id);
    job.students.push(student._id);
    await student.save()
    await job.save()

    res.json({ student, job })
});

exports.readalljobs = catchErrors(async (req, res, next) => {
    const jobs = await Job.find().exec();

    res.status(200).json({ jobs });
});