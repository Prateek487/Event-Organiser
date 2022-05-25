const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");

const Events = require("./Routes/EventRoutes");
const Users = require("./Routes/UserRoute");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());

app.use(
  session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "Event Oragniser secret",
    Cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use("/event", Events);
app.use("/user", Users);

mongoose
  .connect(
    process.env.MONGODB_CONNECTION_STRING
  )
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Starting server at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
