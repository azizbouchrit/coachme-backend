const mongoose = require("mongoose");
const Week = mongoose.Schema({
  week_name: { type: String, default: "" },
});
module.exports = mongoose.model("Week", Week);
