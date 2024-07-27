const express = require("express");
const {
    homepage,
    currentUser,
    studentsignup,
    studentsignin,
    studentsignout,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar,
    applyinternship,
    applyjob,
    readallinternships,
    readalljobs
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();
const Student = require("../models/studentModel");


// GET /
router.get('/', homepage);

// POST /student
router.post('/student', isAuthenticated, currentUser);

// POST /student/signup
router.post("/student/signup", studentsignup);

// POST /student/signin
router.post("/student/signin", studentsignin);

// GET /student/signout
router.get("/student/signout", isAuthenticated, studentsignout);

// POST /student/send-mail
router.post("/student/sendmail", studentsendmail);

// GET /student/forgetlink/:studentid
router.post("/student/forgetlink", studentforgetlink);

// POST /student/resetpassword/:studentid
router.post("/student/resetpassword/:id", isAuthenticated, studentresetpassword);

// POST /student/update/:studentid
router.post("/student/update/:id", isAuthenticated, studentupdate);

// POST /student/avatar/:studentid
router.post("/student/avatar/:id", isAuthenticated, studentavatar);


// -----apply internships-----

// POST /student/apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship);

// POST /student/allinternships/
router.post("/student/allinternships", isAuthenticated, readallinternships);


// -----apply jobs-----

// POST /student/apply/job/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);

// POST /student/alljobs/
router.post("/student/alljobs", isAuthenticated, readalljobs);


module.exports = router;