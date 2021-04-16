const express = require("express");
const mongoose = require("mongoose");
const programRouter = express.Router();
const programCtrl = require("../controllers/program");

programRouter.get("/getAll", programCtrl.getAll);
programRouter.get("/getById/:id", programCtrl.getById);
programRouter.post("/create", programCtrl.create);
programRouter.put("/update/:id", programCtrl.update);
programRouter.delete("/deleteById/:id", programCtrl.deleteById);
module.exports = programRouter;
