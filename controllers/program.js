const Program = require("../models/Program");
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
  //validation
  try {
    let program = new Program({
      program_name: req.body.program_name,
      freq: req.body.freq,
      nb_ins: req.body.nb_ins,
      period: req.body.period,
    });
    program = await program.save();
    res.send(program);
  } catch (err) {
    console.log("err", err);
  }
};
const update = async (req, res) => {
  //validation
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, {
      program_name: req.body.program_name,
      freq: req.body.freq,
      nb_ins: req.body.nb_ins,
      timing: req.body.timing,
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
