const mongoose = require("mongoose");
const Instruction = mongoose.Schema({
  instruction_name: { type: String, default: "" },
  nb_series: { type: Number, default: "" },
  nb_repetition: { type: Number, default: "" },
  time_exec: { type: Number, default: "" },
});
module.exports = mongoose.model("Instruction", Instruction);
