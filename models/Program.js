const mongoose = require("mongoose");
const Joi = require("joi");
const Program = mongoose.Schema({
  program_name: { type: String, default: "" },
  freq: { type: Number, default: "" },
  nb_ins: { type: Number, default: "" },
  period: { type: Number, default: "" },
});

module.exports = mongoose.model("Program", Program);
