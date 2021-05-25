const mongoose = require("mongoose");
const Joi = require("joi");

const Instruction = mongoose.model(
  "Instruction",
  new mongoose.Schema({
    instructionName: { type: String, default: "" },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    numberSeries: { type: Number },
    numberRepetitions: { type: Number },
    executionTime: { type: Number },
  })
);
function validateInstruction(Instruction) {
  const schema = {
    instructionName: Joi.string().min(3).required(),
    sessionId: Joi.string().required(),
    numberSeries: Joi.number().min(0).required(),
    numberRepetitions: Joi.number().min(0).required(),
    executionTime: Joi.number().min(0).required(),
  };

  return Joi.validate(Instruction, schema);
}
exports.Instruction = Instruction;
exports.validate = validateInstruction;
