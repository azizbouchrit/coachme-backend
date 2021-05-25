const mongoose = require("mongoose");
const Joi = require("joi");

const Session = mongoose.model(
  "Session",
  new mongoose.Schema({
    sessionName: { type: String, default: "" },
    weekId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Week",
      required: true,
    },
  })
);
function validateSession(session) {
  const schema = {
    sessionName: Joi.string().min(3).required(),
    weekId: Joi.string().required(),
  };

  return Joi.validate(session, schema);
}
exports.Session = Session;
exports.validate = validateSession;
