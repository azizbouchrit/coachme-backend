const express = require("express");
const difficultyRouter = express.Router();
const difficultyController = require("../controllers/difficulty");

difficultyRouter.post("/", difficultyController.create);
difficultyRouter.get("/", difficultyController.findAll);
difficultyRouter.get("/:id", difficultyController.findOne);
difficultyRouter.put("/:id", difficultyController.update);
difficultyRouter.delete("/:id", difficultyController.deleteById);

module.exports = difficultyRouter;