const bcrypt = require("bcryptjs");
const {sendErrorResponse} = require("./functions");
const { validationResult } = require("express-validator");

const User = require("../Models/Users");

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedpswd) => {
      const user = new User({
        email: email,
        password: hashedpswd,
      });
      return user.save();
    })
    .then((result) => {
      req.session.LoggedIn = true;
      const user = {
        UserId: result._id,
        email: result.email,
      }
      req.session.user = user;
      res.status(200).json({ message: "New Account Created" });
    })
    .catch((err) => {
      console.log(err);
      sendErrorResponse(req,res,err);
    });
};
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(email,password)

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log("Email Not Found");
        const error = new Error();
        error.status = 401;
        throw error;
      }
      
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        console.log("Password Incorrect");
        const error = new Error();
        error.status = 401;
        throw error;
      }
      req.session.LoggedIn = true;
      req.session.user = {
        UserId: loadedUser._id,
        email: loadedUser.email,
      };
      res.status(200).json({ message: "User Logged In" });
    })
    .catch((err) => {
      console.log(err);
      sendErrorResponse(req,res,err);
    });
};
