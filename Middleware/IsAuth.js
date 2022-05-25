const { sendErrorResponse } = require("../Controllers/functions");

exports.IsAuth = (req, res, next) => {
  try {
    if (req.session.LoggedIn) {
      return next();
    }
    console.log("User not logged In");
    const error = new Error();
    error.status = 440;
    throw error;
  } catch (err) {
    console.log(err);
    sendErrorResponse(req, res, err);
  }
};
