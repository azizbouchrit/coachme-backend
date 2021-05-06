const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/comment");
const auth = require("../middlewares/auth");

commentRouter.get('/', auth, commentController.getAll)
commentRouter.post('/', auth, commentController.create)
commentRouter.delete('/:id', auth, commentController.deleteById)

module.exports = commentRouter
