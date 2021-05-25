const express = require("express");
const goalRouter = express.Router();
const goalController = require("../controllers/goal");

goalRouter.post("/", goalController.create);
goalRouter.get("/", goalController.findAll);
goalRouter.get("/:id", goalController.findOne);
goalRouter.put("/:id", goalController.update);
goalRouter.delete("/:id", goalController.deleteById);

module.exports = goalRouter;