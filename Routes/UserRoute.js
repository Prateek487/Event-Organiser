const express = require("express");
const { body } = require("express-validator");

const UserController = require("../Controllers/UserController");
const { IsAuth } = require("../Middleware/IsAuth");
const User = require("../Models/Users");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid Email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  UserController.signUp
);

router.get("/login", (req, res) => {
  if (req.session.user) {
    console.log(req.session.user);
    console.log("User Logged In");
    return res.send({ loggedIn: true, user: req.session.user });
  }
  console.log("Session Not Found");
  return res.send({ loggedIn: false });
});

router.post("/login", UserController.login);

router.delete("/logout", IsAuth, (req, res) => {
  req.session.destroy();
  console.log("User Logged Out");
  return res.send({ message: "User Logged Out" });
});

module.exports = router;
