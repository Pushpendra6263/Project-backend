const express = require("express");
const {
    resume,
    addeducation,
    editeducation,
    deleteeducation,
    addjobs,
    editjobs,
    deletejobs,
    addinternships,
    editinternships,
    deleteinternships,
    addresponsibilities,
    editresponsibilities,
    deleteresponsibilities,
    addcourses,
    editcourses,
    deletecourses,
    addprojects,
    editprojects,
    deleteprojects,
    addskills,
    editskills,
    deleteskills,
    addaccomplishments,
    editaccomplishments,
    deleteaccomplishments,
} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();
// const Student = require("../models/studentModel");



// GET /
router.get('/', isAuthenticated, resume);

// -----education-----

// POST
router.post('/add-education', isAuthenticated, addeducation);

// POST
router.post('/edit-education/:eduid', isAuthenticated, editeducation);

// POST
router.post('/delete-education/:eduid', isAuthenticated, deleteeducation);


// -----jobs-----

// POST
router.post('/add-jobs', isAuthenticated, addjobs);

// POST
router.post('/edit-jobs/:jobid', isAuthenticated, editjobs);

// POST
router.post('/delete-jobs/:jobid', isAuthenticated, deletejobs);


// -----internshios-----

// POST
router.post('/add-internships', isAuthenticated, addinternships);

// POST
router.post('/edit-internships/:intrnid', isAuthenticated, editinternships);

// POST
router.post('/delete-internships/:intrnid', isAuthenticated, deleteinternships);


// -----responsibilities-----

// POST
router.post('/add-responsibilities', isAuthenticated, addresponsibilities);

// POST
router.post('/edit-responsibilities/:resid', isAuthenticated, editresponsibilities);

// POST
router.post('/delete-responsibilities/:resid', isAuthenticated, deleteresponsibilities);


// -----courses-----

// POST
router.post('/add-courses', isAuthenticated, addcourses);

// POST
router.post('/edit-courses/:crseid', isAuthenticated, editcourses);

// POST
router.post('/delete-courses/:crseid', isAuthenticated, deletecourses);


// -----projects-----

// POST
router.post('/add-projects', isAuthenticated, addprojects);

// POST
router.post('/edit-projects/:prjtid', isAuthenticated, editprojects);

// POST
router.post('/delete-projects/:prjtid', isAuthenticated, deleteprojects);


// -----skills-----

// POST
router.post('/add-skills', isAuthenticated, addskills);

// POST
router.post('/edit-skills/:sklid', isAuthenticated, editskills);

// POST
router.post('/delete-skills/:sklid', isAuthenticated, deleteskills);


// -----accomplishments-----

// POST
router.post('/add-accomplishments', isAuthenticated, addaccomplishments);

// POST
router.post('/edit-accomplishments/:accid', isAuthenticated, editaccomplishments);

// POST
router.post('/delete-accomplishments/:accid', isAuthenticated, deleteaccomplishments);







module.exports = router;