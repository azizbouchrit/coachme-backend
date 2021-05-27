const { User, validate } = require("../models/user");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

const createUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log("REQ BODY", req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");
    user = await User.findOne({ username: req.body.username });
    if (user)
      return res.status(400).send("Username not available try another one.");
    user = new User(
      _.pick(req.body, [
        "username",
        "firstName",
        "lastName",
        "email",
        "password",
        "gender",
        "birthDate",
        "role",
      ])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res
      .header("x-auth-token", token)
      .send(
        _.pick(user, ["_id", "username", "firstName", "lastName", "email"])
      );
  } catch (err) {
    console.log("err", err);
  }
};

exports.createUser = createUser;
exports.getCurrentUser = getCurrentUser;
