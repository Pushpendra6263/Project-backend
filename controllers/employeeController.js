const { Router } = require("express");
const { catchErrors } = require("../middleware/catchErrors");
const Employee = require("../models/employeeModel");
const Internship = require('../models/internshipModel')
const Job = require('../models/jobModel')
const errorHandler = require("../utils/errorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendToken } = require("../utils/sendToken");
const path = require('path');
const imagekit = require('../utils/imageKit').initImageKit();



exports.currentEmployee = catchErrors(async (req, res, next) => {
    const employee = await Employee.findById(req.id)
        .populate("jobs")
        .populate("internships")
        .exec();
    res.json({ employee })
});


exports.homepage = catchErrors(async (req, res, next) => {
    res.json({ message: "Secure Employee HomePage!" })
});


exports.employeesignup = catchErrors(async (req, res, next) => {
    const employee = await new Employee(req.body).save();
    // res.status(201).json(employee);
    sendToken(employee, 201, res);
});


exports.employeesignin = catchErrors(async (req, res, next) => {
    const employee = await Employee.findOne({ email: req.body.email }).select("+password").exec();

    if (!employee)
        return next(
            new errorHandler("User not found with this email address", 404)
        );

    const isMatch = employee.comparepassword(req.body.password);

    if (!isMatch)
        return next(
            new errorHandler("Wrong Credentials", 500)
        );

    sendToken(employee, 200, res);
    // res.json(employee);

});


exports.employeesignout = catchErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "Successfully Signout" });
});


exports.employeesendmail = catchErrors(async (req, res, next) => {

    const employee = await Employee.findOne({ email: req.body.email }).exec();

    if (!employee) {
        return next(

            new errorHandler("User not found with this email address", 404)
        );
    };

    // const url = `${req.protocol}://${req.get("host")}/employee/forgetlink/${employee._id}`

    const url = Math.floor(Math.random() * 9000 + 1000);
    sendmail(req, res, next, url)
    employee.resetPasswordToken = `${url}`;
    await employee.save();

    res.json({ message: "mail send" });

});


exports.employeeforgetlink = catchErrors(async (req, res, next) => {

    const employee = await Employee.findOne({ email: req.body.email }).exec();

    // if (!employee) {
    //     return next(
    //         new errorHandler("User Not Found With This Email Address", 404)
    //     );
    // };

    if (employee.resetPasswordToken == req.body.otp) {
        employee.resetPasswordToken = "0";
        employee.password = req.body.password;
        await employee.save();
    } else {
        return next(
            new errorHandler("Invalid Reset Password Link! PLease try again", 500)
        );
    }

    res.status(200).json({
        message: "Password hav been successfully changed"
    })


});


exports.employeeresetpassword = catchErrors(async (req, res, next) => {

    const employee = await Employee.findById(req.id).exec();
    employee.password = req.body.password;
    await employee.save();

    sendToken(employee, 201, res)

    res.status(200).json({
        message: "Password Has Been Successfully Reset"
    })

});


exports.employeeupdate = catchErrors(async (req, res, next) => {

    await Employee.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "Employee Updated Successfully",
    })
});


exports.employeeavatar = catchErrors(async (req, res, next) => {

    const employee = await Employee.findById(req.params.id).exec();
    const file = req.files.organizationlogo;
    const modifiedFileName = `logo-${Date.now()}${path.extname(file.name)}`;

    if (employee.organizationlogo.fileId !== "") {
        await imagekit.deleteFile(employee.organizationlogo.fileId)
    }

    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    });
    employee.organizationlogo = { fileId, url }
    await employee.save();
    res.status(200).json({
        success: true,
        message: "Profile uploaded"
    })
});


// -----internships-----


exports.createinternship = catchErrors(async (req, res, next) => {

    const employee = await Employee.findById(req.id).exec();
    const internship = await new Internship(req.body);
    internship.employee = employee._id;
    employee.internships.push(internship._id);
    await internship.save();
    await employee.save();
    res.status(201).json({ success: true, internship })
});

exports.readinternship = catchErrors(async (req, res, next) => {

    const { internship } = await Employee.findById(req.id).populate("interships").exec();
    // const internship = await Internship.find().exec();

    res.status(200).json({ success: true, internship })
});

exports.readsingleinternship = catchErrors(async (req, res, next) => {

    const internship = await Internship.findById(req.params.id).exec();

    // if(!internship) return new errorHandler("Internship Not Fount")

    res.status(200).json({ success: true, internship })
});


// -----jobs-----

exports.createjob = catchErrors(async (req, res, next) => {

    const employee = await Employee.findById(req.id).exec();
    const job = await new Job(req.body);
    job.employee = employee._id;
    employee.jobs.push(job._id);
    await job.save();
    await employee.save();
    res.status(201).json({ success: true, job })
});

exports.readjob = catchErrors(async (req, res, next) => {

    const { job } = await Employee.findById(req.id).populate("job").exec();

    res.status(200).json({ success: true, job })
});

exports.readsinglejob = catchErrors(async (req, res, next) => {

    const job = await Job.findById(req.params.id).exec();

    res.status(200).json({ success: true, job })
});

exports.deletejob = catchErrors(async (req, res, next) => {

    // const employee = await Employee.findById(req.id).exec();
    // const deletejob = employee.jobs.filter((i) => i.id !== req.params.id);
    // employee.jobs = deletejob;
    // await employee.save();
    // res.json({ message: "Job Deleted!" })

    const job = await Job.findById(req.params.id).filter().exec();

    res.status(200).json({ success: true, job })



    // const { job } = await Employee.findById(req.id).populate("job").exec();

    // res.status(200).json({ success: true })
});