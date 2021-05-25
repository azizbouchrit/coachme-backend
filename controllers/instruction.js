const { Instruction, validate } = require("../models/Instruction");
const { Session } = require("../models/Session");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const getAll = async (req, res) => {
  try {
    const instructions = await Instruction.find();
    if (!instructions)
      return {
        status: false,
        code: 409,
        err: { msg: "no instruction found " },
      };
    res.send(instructions);
  } catch (err) {
    console.log("err", err);
  }
};
const getById = async (req, res) => {
  try {
    const instruction = await Week.findById(req.params.id);
    if (!instruction)
      return {
        status: false,
        code: 404,
        err: { msg: "the instruction with given id not found" },
      };
    res.send(instruction);
  } catch (err) {
    console.log("err", err);
  }
};
const create = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const session = await Session.findById(req.body.sessionId);
    if (!session) return res.status(400).send("Invalid session.");

    let instruction = new Instruction({
      instructionName: req.body.instructionName,
      sessionId: session._id,
      numberSeries: req.body.numberSeries,
      numberRepetitions: req.body.numberRepetitions,
      executionTime: req.body.executionTime,
    });
    instruction = await instruction.save();
    res.send(instruction);
  } catch (err) {
    console.log("err", err);
  }
};
const update = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const session = await Session.findById(req.body.sessionId);
    if (!session) return res.status(400).send("Invalid session.");

    let instruction = await Instruction.findByIdAndUpdate(req.params.id, {
      instructionName: req.body.instructionName,
      sessionId: session._id,
      numberSeries: req.body.numberSeries,
      numberRepetitions: req.body.numberRepetitions,
      executionTime: req.body.executionTime,
    });
    if (!instruction)
      return {
        status: false,
        code: 404,
        err: { msg: "the instruction with given id not found" },
      };
    res.send(instruction);
  } catch (err) {
    console.log("err", err);
  }
};
const deleteById = async (req, res) => {
  try {
    const instruction = await Instruction.findByIdAndRemove(req.params.id);
    if (!instruction)
      return {
        status: false,
        code: 404,
        err: { msg: "the instruction with given id not found" },
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
