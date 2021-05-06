const { Comment } = require("../models/Comment");
const { User, decodeAuthToken } = require("../models/user");

const getAll = async (req, res) => {
  try {
    const comments = await Comment.find();
    if (!comments)
      return { status: false, code: 409, err: { msg: "no comments found " } };
    res.send(programs);
  } catch (err) {
    console.log("err", err);
  }
}

const create = async (req, res) => {
  //validation
  const token = req.header('x-auth-token')
  const user = decodeAuthToken(token)
  console.log('user', user);
  try {
    let comment = new Comment({
      programId: req.body.programId,
      message: req.body.message,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role
      }
    });
    comment = await comment.save();
    res.send(comment);
  } catch (err) {
    console.log("err", err);
  }
}


const deleteById = async (req, res) => {
  const token = req.header('x-auth-token')
  let comment = await Comment.findById(req.params.id);
  if (!comment)
    return res.status(404).send('the comment with given id not found')
  const user = decodeAuthToken(token)
  if (user._id !== comment.user._id.toString() || user.role !== 'ADMIN')
    return res.status(403).send('Forbidden')
  try {
    comment = await Comment.findByIdAndRemove(req.params.id);
    res.status(200).send('OK')
  } catch (err) {
    return console.log("err", err);
  }

}


exports.getAll = getAll;
exports.create = create;
exports.deleteById = deleteById;
// exports.update = update;
