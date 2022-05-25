const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  OrganiserID: {
    type: Schema.Types.ObjectId,
    ref : "User",
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  EventTime: {
    type: Date,
    default: Date.now,
  },
  EventDescription: {
    type: String,
    required: true
  },
});
module.exports = mongoose.model("Events", EventSchema);
