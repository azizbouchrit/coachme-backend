const Joi = require("joi");
const mongoose = require("mongoose");
const Week = mongoose.model(
  "Week",
  new mongoose.Schema({
    weekName: { type: String, default: "" },
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },
  })
);
function validateWeek(week) {
  const schema = {
    weekName: Joi.string().min(3).required(),
    programId: Joi.string().required(),
  };

  return Joi.validate(week, schema);
}
exports.Week = Week;
exports.validate = validateWeek;
