const express = require("express");
const mongoose = require("mongoose");
const weekRouter = express.Router();
const weekCtrl = require("../controllers/week");

weekRouter.get("/", weekCtrl.getAll);
weekRouter.get("/:id", weekCtrl.getById);
weekRouter.post("/", weekCtrl.create);
weekRouter.put("/:id", weekCtrl.update);
weekRouter.delete("/:id", weekCtrl.deleteById);
module.exports = weekRouter;
