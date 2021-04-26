const express = require("express");
const app = express();
const mongoose = require("mongoose");
const programs = require("./routes/programs");
const goals = require("./routes/goals");
const sessionsDate = require("./routes/sessionsDate");
const subscriptions = require("./routes/subscriptions");
const difficulties = require("./routes/difficulties");
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
app.use(express.json());
app.use("/programs", programs);
app.use("/goals", goals);
app.use("/sessionsDate", sessionsDate);
app.use("/subscriptions", subscriptions);
app.use("/difficulties", difficulties);

app.get("/", (req, res) => {
  console.log("opening ... ");
  res.json({ msg: "API DEV", port: process.env.PORT || 3000 });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening for ${port}`));
