const mongoose = require("mongoose");
const Files = mongoose.model(
  "Files",
  new mongoose.Schema({
    /*idExercice: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "Exercice",
      required: true,
    },*/
    fileName: { type: String, required: true },
    pathFile: { type: String, required: true },
    contentType: { type: String, required: true },
  })
);

exports.Files = Files;
