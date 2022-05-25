exports.sendErrorResponse = (req, res, err) => {
  if (err.status == 401) {
    err.message = "Invalid Email or Password";
  } else if (err.status == 404) {
    err.message = "Invalid Email";
  } else if (err.status == 422) {
    err.message = "Validation Failed";
  } else if (err.status == 440) {
    err.message = "Session Expired";
  } else if (!err.status) {
    err.status = 500;
    err.message = "Something Went Wrong";
  }
  return res
    .status(err.status)
    .send({ message: err.message, statusCode: err.status })
    .end();
};
