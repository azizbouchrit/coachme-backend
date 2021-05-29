const { User, validate } = require("../models/user");
const bcrypt = require("bcryptjs")
const _ = require("lodash");
const { Program } = require("../models/Program");

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  res.send(user)
}

const createUser = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  console.log("REQ BODY", req.body);
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered.')
    user = await User.findOne({ username: req.body.username })
    if (user) return res.status(400).send('Username not available try another one.')
    user = new User(
      _.pick(req.body, ['username', 'firstName', 'lastName', 'email', 'password', 'gender', 'birthDate', 'role'])
    )
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    const token = user.generateAuthToken()

    res.header('x-auth-token', token).
      header("access-control-expose-headers", "x-auth-token")
      .send({ user: _.pick(user, ['_id', 'username', 'firstName', 'lastName', 'email', 'role']), token })
  } catch (err) {
    console.log("err", err);
  }
}

const getPopularCoaches = async (req, res) => {
  try {
    // console.log(programsByCoach);
    const programs = await Program.find();
    if (!programs)
      return res.status(200).send("no program found ")
    let programsByCoach = _.groupBy(programs, 'user._id')
    let grouppedPrograms = []
    programsByCoach = Object.entries(programsByCoach)
    programsByCoach.forEach(([key, value]) => {
      grouppedPrograms.push({
        coachId: key,
        totalSubscriptions: getTotalSubscriptions(value)
      })
    })
    grouppedPrograms = _.orderBy(grouppedPrograms, ['totalSubscriptions'],['desc']).slice(0, 4)
    console.log(grouppedPrograms);
    let popularCoaches = []
    for (const program of grouppedPrograms) {
      let coach = await User.findById(program.coachId).select('-password').lean();
      popularCoaches.push(_.assign( program, coach))
    }


    res.send(popularCoaches)

    // let popularCoaches = []
    // popularCoaches = grouppedPrograms.map(async program => {
    //   User.findById(program.coachId).select('-password').then(coach => {
    //     program.coach = coach
    //     console.log(coach);
    //   })
    // coach = Object.assign({}, program, coach)
    // console.log(program);
    // return program
    // })
    // for (let i = 0; i < grouppedPrograms.length; i++) {
    //   User.findById(key).select('-password').then(coach => {
    //     popularCoaches.push(Object.assign({}, grouppedPrograms[i], coach))
    //     // console.log(coach);
    //   })
    // }

    // console.log(popularCoaches);

  } catch (err) {
    res.status(400).send(err)
    console.log(err);
  }
}

function getTotalSubscriptions(programs) {
  let sum = 0
  programs.map(program => (sum += program.numberSubscriptions))
  return sum
}

exports.getPopularCoaches = getPopularCoaches
exports.createUser = createUser
exports.getCurrentUser = getCurrentUser