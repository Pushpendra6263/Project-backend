const express = require("express");
const {
    homepage,
    employeesignup,
    employeesignin,
    employeesignout,
    employeesendmail,
    employeeforgetlink,
    employeeresetpassword,
    employeeupdate,
    employeeavatar,
    currentEmployee,

    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob,
    deletejob,
} = require("../controllers/employeeController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();
// const Student = require("../models/studentModel");



// GET /
router.get('/', homepage);

// POST /employee
router.post('/currentemployee', isAuthenticated, currentEmployee);

// // POST /employee/signup
router.post("/signup", employeesignup);

// POST employee/student/signin
router.post("/signin", employeesignin);

// GET  employee/signout
router.get("/signout", isAuthenticated, employeesignout);

// POST  employee/send-mail
router.post("/sendmail", employeesendmail);

// GET  employee/forgetlin/:employeeid
router.post("/forgetlink", employeeforgetlink);

// POST  employee/resetpassword/:employeeid
router.post("/resetpassword/:id", isAuthenticated, employeeresetpassword);

// POST  employee/update/:employeeid
router.post("/update/:id", isAuthenticated, employeeupdate);

// POST  employee/avatar/:employeeid
router.post("/organizationlogo/:id", isAuthenticated, employeeavatar);


// -----internships-----

// POST /employee/internships/create
router.post("/internships/create", isAuthenticated, createinternship)

// POST /employee/internships/read
router.post("/internships/read", isAuthenticated, readinternship)

// POST /employee/internships/read/:id
router.post("/internships/read/:id", isAuthenticated, readsingleinternship)


// -----jobs-----

// POST /employee/jobs/create
router.post("/jobs/create", isAuthenticated, createjob)

// POST /employee/jobs/read
router.post("/jobs/read", isAuthenticated, readjob)

// POST /employee/jobs/read/:id
router.post("/jobs/read/:id", isAuthenticated, readsinglejob)

// POST /employee/jobs/delete
router.get("/jobs/delete/:id", isAuthenticated, deletejob)




module.exports = router;