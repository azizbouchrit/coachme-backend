const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const exercices = require("./routes/exercices");
const evolutions = require("./routes/evolutions");
const feedbacks = require("./routes/feedbacks");
const files = require("./routes/files");

const auth = require("./routes/auth");
const programs = require("./routes/programs");
const goals = require("./routes/goals");
const sessionsDate = require("./routes/sessionsDate");
const subscriptions = require("./routes/subscriptions");
const difficulties = require("./routes/difficulties");
const weeks = require("./routes/weeks");
const sessions = require("./routes/sessions");
const instructions = require("./routes/instructions");

const users = require("./routes/users");
const comments = require("./routes/comments");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  family: 4, // Use IPv4, skip trying IPv6
  auto_reconnect: true,
};
mongoose
  .connect("mongodb://localhost/coachme", options)
  .then(() => console.log("connected to mongodb ..."))
  .catch((err) => console.error("could not connect to mongodb ...", err));
app.use(cors());
app.use(express.json());
app.use("/api/goals", goals);
app.use("/api/sessionsDate", sessionsDate);
app.use("/api/subscriptions", subscriptions);
app.use("/api/difficulties", difficulties);
app.use("/api/sessions", sessions);
app.use("/api/weeks", weeks);
app.use("/api/instructions", instructions);
app.use("/api/exercices", exercices);
app.use("/api/evolutions", evolutions);
app.use("/api/feedbacks", feedbacks);
app.use("/api/files", files);
app.use("/api/programs", programs);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/comments", comments);

app.get("/", (req, res) => {
  console.log("opening ... ");
  res.json({ msg: "API DEV", port: process.env.PORT || 3000 });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening for ${port}`));
