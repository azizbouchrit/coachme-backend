const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
  },
  gender: {
    type: String,
    // required: true,
  },
  birthDate: {
    type: Date,
    // required: true,
  },
  address: { type: String },
  role: {
    type: String,
    default: "MEMBER", // "COACH" "ADMIN"
    // required: true,
  },
  programs: [
    {
      program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, role: this.role },
    config.get("jwtPrivateKey")
  );
  return token;
};

const decodeAuthToken = (token) => {
  const decodedToken = jwt.decode(token);
  return decodedToken;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    username: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(4).max(255).required(),
    gender: Joi.string().min(3).max(255).required(),
    birthDate: Joi.date().required(),
    address: Joi.string().min(3).max(255),
    role: Joi.string().min(3).max(255).required(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.decodeAuthToken = decodeAuthToken;
