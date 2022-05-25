const Event = require("../Models/Events");
const User = require("../Models/Users");

exports.getAllEvents = (req, res, next) => {
  Event.find()
    .populate({
      path: "OrganiserID",
      select: { email: 1, _id: 0 },
    })
    .sort("EventTime")
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((err) => console.log(err));
};
exports.addNewEvent = (req, res, next) => {
  const NewEvent = new Event({
    OrganiserID: req.session.user.UserId,
    EventDescription: req.body.EventDescription,
    EventTime: req.body.EventTime,
  });
  NewEvent.save()
    .then((result) => {
      const user = {
        _id: result._id,
        OrganiserID: { email: req.session.user.email },
        EventTime: result.EventTime,
        EventDescription: result.EventDescription,
        CreatedAt: result.CreatedAt,
      };
      res.status(200).json({ Event: user });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deleteEvent = (req, res, next) => {
  const EventID = req.params.id;
  Event.findByIdAndDelete(EventID)
    .then((result) => {
      console.log("Line 42", result);
      res.status(200).json({ message: "Event Deleted" });
    })
    .catch((err) => {
      err.statusCode = 401;
      throw err;
    });
};
