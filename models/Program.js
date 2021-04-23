const mongoose = require("mongoose");
const Joi = require("joi");
const Program = mongoose.model(
  "Program",
  new mongoose.Schema({
    programName: { type: String, default: "" },
    frequence: { type: Number },
    numberInscriptions: { type: Number },
    period: { type: Number },
  })
);

function validateProgram(program) {
  const schema = {
    programName: Joi.string().min(3).required(),
    frequence: Joi.number().min(0).required(),
    numberInscriptions: Joi.number().min(0).required(),
    period: Joi.number().min(0).required(),
  };

  return Joi.validate(program, schema);
}
exports.Program = Program;
exports.validate = validateProgram;
