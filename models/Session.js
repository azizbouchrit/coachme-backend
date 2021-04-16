const mongoose = require("mongoose");
const Session = mongoose.Schema({
  session_name: { type: String, default: "" },
});
module.exports = mongoose.model("Session", Session);
