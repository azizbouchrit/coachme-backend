const { Week, validate } = require("../models/Week");
const { Program } = require("../models/Program");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const getAll = async (req, res) => {
  try {
    const weeks = await Week.find();
    if (!weeks)
      return { status: false, code: 409, err: { msg: "no week found " } };
    res.send(weeks);
  } catch (err) {
    console.log("err", err);
  }
};
const getById = async (req, res) => {
  try {
    const week = await Week.findById(req.params.id);
    if (!week)
      return {
        status: false,
        code: 404,
        err: { msg: "the week with given id not found" },
      };
    res.send(week);
  } catch (err) {
    console.log("err", err);
  }
};
const create = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const program = await Program.findById(req.body.programId);
    console.log(program);
    if (!program) return res.status(400).send("Invalid program.");

    let week = new Week({
      weekName: req.body.weekName,
      programId: program._id,
    });
    week = await week.save();
    res.send(week);
  } catch (err) {
    console.log("err", err);
  }
};
const update = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const program = await Program.findById(req.body.programId);
    if (!program) return res.status(400).send("Invalid program.");

    const week = await Week.findByIdAndUpdate(req.params.id, {
      weekName: req.body.weekName,
      programId: program._id,
    });
    if (!week)
      return {
        status: false,
        code: 404,
        err: { msg: "the week with given id not found" },
      };
    res.send(week);
  } catch (err) {
    console.log("err", err);
  }
};
const deleteById = async (req, res) => {
  try {
    const week = await Week.findByIdAndRemove(req.params.id);
    if (!week)
      return {
        status: false,
        code: 404,
        err: { msg: "the week with given id not found" },
      };
  } catch (err) {
    console.log("err", err);
  }
};

exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.deleteById = deleteById;
