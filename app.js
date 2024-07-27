require("dotenv").config({ path: './.env' });
const express = require('express');
const cors = require('cors')
const app = express();


// mongodb connection

require("./models/database").connectDatabase();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

//logger

const logger = require('morgan');
app.use(logger("tiny"));

// bodyparcer

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// session and cookie

const session = require("express-session")
const cookie = require("cookie-parser")
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET

}));
app.use(cookie());

// express file-upload

const fileupload = require("express-fileupload")
app.use(fileupload())

// routes

app.use("/", require("./routes/indexRoutes"))
app.use("/resume", require("./routes/resumeRoutes"))
app.use("/employee", require("./routes/employeeRoutes"))

// error handling

const errorHandler = require("./utils/errorHandler");
const { generatedErrors } = require("./middleware/error");
app.all('*', (req, res, next) => {
    next(new errorHandler(`Request URL not Found ${req.url}`, 404))
})
app.use(generatedErrors);


app.listen(process.env.PORT, console.log(`server running on post ${process.env.PORT}`));