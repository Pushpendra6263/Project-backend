const jwt = require("jsonwebtoken");
const errorHandler = require('../utils/errorHandler');
const { catchErrors } = require('./catchErrors')

exports.isAuthenticated = catchErrors(async (req, res, next) => {

    const { token } = req.cookies;

    if(!token){
        return next(new errorHandler("Please login to access further") , 401)
    }

    const{ id } = jwt.verify(token, process.env.JWT_SECRET)
    req.id = id;
    next();

    // res.json({id, token});
});

