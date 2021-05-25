const express = require("express");
const sessionDateRouter = express.Router();
const sessionDateController = require("../controllers/sessionDate");

sessionDateRouter.post("/", sessionDateController.create);
sessionDateRouter.get("/", sessionDateController.getAll);
sessionDateRouter.get("/:id", sessionDateController.getById);
sessionDateRouter.put("/:id", sessionDateController.update);
sessionDateRouter.delete("/:id", sessionDateController.deleteById);

module.exports = sessionDateRouter;