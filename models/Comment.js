const mongoose = require("mongoose")
const Joi = require('joi')

const commentSchema = mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
      role: {
        type: String,
        required: true,
      }
    }),
    required: true
  },
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  message: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024
  }


})


const Comment = mongoose.model('Comment', commentSchema)

function validateComment(comment) {
  const schema = {
    userId: Joi.objectId().required(),
    programId: Joi.objectId().required(),
    message: Joi.string().min(1).max(1024).required()
  }
  return Joi.validate(comment, schema);
}

exports.Comment = Comment
exports.validate = validateComment