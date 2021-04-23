const express = require("express");
const mongoose = require("mongoose");
const instructionRouter = express.Router();
const instructionCtrl = require("../controllers/instruction");

instructionRouter.get("/", instructionCtrl.getAll);
instructionRouter.get("/:id", instructionCtrl.getById);
instructionRouter.post("/", instructionCtrl.create);
instructionRouter.put("/:id", instructionCtrl.update);
instructionRouter.delete("/:id", instructionCtrl.deleteById);
module.exports = instructionRouter;
