const express = require("express");
const mongoose = require("mongoose");
const sessionRouter = express.Router();
const sessionCtrl = require("../controllers/session");

sessionRouter.get("/", sessionCtrl.getAll);
sessionRouter.get("/:id", sessionCtrl.getById);
sessionRouter.post("/", sessionCtrl.create);
sessionRouter.put("/:id", sessionCtrl.update);
sessionRouter.delete("/:id", sessionCtrl.deleteById);
module.exports = sessionRouter;
