const express = require("express");
const subscriptionRouter = express.Router();
const subscriptionController = require("../controllers/subscription");

subscriptionRouter.post("/", subscriptionController.create);
subscriptionRouter.get("/", subscriptionController.findAll);
subscriptionRouter.get("/:id", subscriptionController.findOne);
subscriptionRouter.put("/:id", subscriptionController.update);
subscriptionRouter.delete("/:id", subscriptionController.delete);

module.exports = subscriptionRouter;