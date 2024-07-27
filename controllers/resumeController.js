const Student = require("../models/studentModel");
const { catchErrors } = require("../middleware/catchErrors");
const errorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid")


exports.resume = catchErrors(async (req, res, next) => {
    const { resume } = await Student.findById(req.id).exec();
    res.json({ message: "Secure Resumepage!", resume })
})


// -----education-----

exports.addeducation = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Education Added!" })
})

exports.editeducation = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(i => i.id === req.params.eduid);
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Education Updated!" })
})

exports.deleteeducation = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const filteredEducation = student.resume.education.filter((i) => i.id !== req.params.eduid);
    student.resume.education = filteredEducation;
    await student.save();
    res.json({ message: "Education Deleted!" })
})


// -----jobs-----

exports.addjobs = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Jobs Added!" })
})

exports.editjobs = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const jobIndex = student.resume.jobs.findIndex(i => i.id === req.params.jobid);
    student.resume.jobs[jobIndex] = {
        ...student.resume.jobs[jobIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Jobs Updated!" })
})

exports.deletejobs = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const filteredjobs = student.resume.jobs.filter((i) => i.id !== req.params.jobid);
    student.resume.jobs = filteredjobs;
    await student.save();
    res.json({ message: "Jobs Deleted!" })
})


// -----internship-----

exports.addinternships = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Internships Added!" })
})

exports.editinternships = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const intrnIndex = student.resume.internships.findIndex(i => i.id === req.params.intrnid);
    student.resume.internships[intrnIndex] = {
        ...student.resume.internships[intrnIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Internships Updated!" })
})

exports.deleteinternships = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const filteredinternships = student.resume.internships.filter((i) => i.id !== req.params.intrnid);
    student.resume.internships = filteredinternships;
    await student.save();
    res.json({ message: "Internships Deleted!" })
})


// -----responsibilities-----

exports.addresponsibilities = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Responsibilities Added!" })
})

exports.editresponsibilities = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const resIndex = student.resume.responsibilities.findIndex(i => i.id === req.params.resid);
    student.resume.responsibilities[resIndex] = {
        ...student.resume.responsibilities[resIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Responsibilities Updated!" })
})

exports.deleteresponsibilities = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const filteredresponsibilities = student.resume.responsibilities.filter((i) => i.id !== req.params.resid);
    student.resume.responsibilities = filteredresponsibilities;
    await student.save();
    res.json({ message: "Responsibilities Deleted!" })
})


// -----courses-----

exports.addcourses = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Courses Added!" })
})

exports.editcourses = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const crseIndex = student.resume.courses.findIndex(i => i.id === req.params.crseid);
    student.resume.courses[crseIndex] = {
        ...student.resume.courses[crseIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Courses Updated!" })
})

exports.deletecourses = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const filteredcourses = student.resume.courses.filter((i) => i.id !== req.params.crseid);
    student.resume.courses = filteredcourses;
    await student.save();
    res.json({ message: "Courses Deleted!" })
})


// -----projects-----

exports.addprojects = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Projects Added!" })
})

exports.editprojects = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const prjtIndex = student.resume.projects.findIndex(i => i.id === req.params.prjtid);
    student.resume.projects[prjtIndex] = {
        ...student.resume.projects[prjtIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Projects Updated!" })
})

exports.deleteprojects = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const filteredprojects = student.resume.projects.filter((i) => i.id !== req.params.prjtid);
    student.resume.projects = filteredprojects;
    await student.save();
    res.json({ message: "Projects Deleted!" })
})


// -----skills-----

exports.addskills = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Skills Added!" })
})

exports.editskills = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const sklIndex = student.resume.skills.findIndex(i => i.id === req.params.sklid);
    student.resume.skills[sklIndex] = {
        ...student.resume.skills[sklIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Skills Updated!" })
})

exports.deleteskills = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const filteredskills = student.resume.skills.filter((i) => i.id !== req.params.sklid);
    student.resume.skills = filteredskills;
    await student.save();
    res.json({ message: "Skills Deleted!" })
})


// -----accomplishments-----

exports.addaccomplishments = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Accomplishments Added!" })
})

exports.editaccomplishments = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const accIndex = student.resume.accomplishments.findIndex(i => i.id === req.params.accid);
    student.resume.accomplishments[accIndex] = {
        ...student.resume.accomplishments[accIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "Accomplishments Updated!" })
})

exports.deleteaccomplishments = catchErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const filteredaccomplishments = student.resume.accomplishments.filter((i) => i.id !== req.params.accid);
    student.resume.accomplishments = filteredaccomplishments;
    await student.save();
    res.json({ message: "Accomplishments Deleted!" })
})