const express = require("express");
const mongoose = require("mongoose");
const programRouter = express.Router();
const programCtrl = require("../controllers/program");
const auth = require("../middlewares/auth");

programRouter.get("/", programCtrl.getAll);
programRouter.get("/:id", programCtrl.getById);
programRouter.post("/", auth, programCtrl.create);
programRouter.put("/:id", auth, programCtrl.update);
programRouter.delete("/:id", auth, programCtrl.deleteById);
module.exports = programRouter;
