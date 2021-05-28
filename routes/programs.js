const express = require("express");
const mongoose = require("mongoose");
const programRouter = express.Router();
const programCtrl = require("../controllers/program");

programRouter.get("/", programCtrl.getAll);
programRouter.get("/:id", programCtrl.getById);
programRouter.post("/", programCtrl.create);
programRouter.put("/:id", programCtrl.update);
programRouter.delete("/:id", programCtrl.deleteById);
programRouter.post("/rating/:program_id", programCtrl.updateRating);
programRouter.post("/follow/:program_id", programCtrl.followProgram);

module.exports = programRouter;
