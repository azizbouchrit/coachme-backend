const { Program, validate } = require("../models/Program");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const getAll = async (req, res) => {
  try {
    const programs = await Program.find();
    if (!programs)
      return { status: false, code: 409, err: { msg: "no program found " } };
    res.send(programs);
  } catch (err) {
    console.log("err", err);
  }
};
const getById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program)
      return {
        status: false,
        code: 404,
        err: { msg: "the program with given id not found" },
      };
    res.send(program);
  } catch (err) {
    console.log("err", err);
  }
};
const create = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let program = new Program({
      programName: req.body.programName,
      frequence: req.body.frequence,
      numberSubscriptions: req.body.numberSubscriptions,
      period: req.body.period,
    });
    program = await program.save();
    res.send(program);
  } catch (err) {
    console.log("err", err);
  }
};
const update = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, {
      programName: req.body.programName,
      frequence: req.body.frequence,
      numberSubscriptions: req.body.numberSubscriptions,
      period: req.body.period,
      new: true,
    });
    if (!program)
      return {
        status: false,
        code: 404,
        err: { msg: "the program with given id not found" },
      };
    res.send(program);
  } catch (err) {
    console.log("err", err);
  }
};
const deleteById = async (req, res) => {
  try {
    const program = await Program.findByIdAndRemove(req.params.id);
    if (!program)
      return {
        status: false,
        code: 404,
        err: { msg: "the program with given id not found" },
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
