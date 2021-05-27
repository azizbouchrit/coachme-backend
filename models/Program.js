const mongoose = require("mongoose");
const Joi = require("joi");
const Program = mongoose.model(
  "Program",
  new mongoose.Schema({
    programName: { type: String, default: "" },
    frequence: { type: Number },
    numberSubscriptions: { type: Number },
    period: { type: Number },
    rating: { type: Number, default: 1, trim: true },
    notes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rate: { type: Number, default: 0, trim: true },
      },
    ],
  })
);

function validateProgram(program) {
  const schema = {
    programName: Joi.string().min(3).required(),
    frequence: Joi.number().min(0).required(),
    numberSubscriptions: Joi.number().min(0).required(),
    period: Joi.number().min(0).required(),
  };

  return Joi.validate(program, schema);
}
exports.Program = Program;
exports.validate = validateProgram;
