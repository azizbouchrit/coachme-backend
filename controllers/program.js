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

const updateRating = async (req, res) => {
  const { user_id, rate } = req.body;
  const { program_id } = req.params;
  try {
    const program = await Program.findById(program_id);

    if (!program)
      return {
        status: false,
        code: 404,
        err: { msg: "the program with given id not found " },
      };
    const notes = program.notes || [];

    let rating = program.rating || 1;

    let somme = 1;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].user == user_id) {
        notes.splice(i, 1);
      } else {
        somme = somme + notes[i].rate;
      }
    }

    notes.push({ user: user_id, rate });

    rating = somme / notes.length;
    console.log(rating);
    const patch = await Program.updateOne(
      { _id: program_id },
      { $set: { notes, rating } }
    );
    if (patch) {
      const new_program = await Program.findById(program_id);
      console.log(new_program);
      if (!new_program) {
        return { status: false, code: 500, err: { msg: "program not saved " } };
      }
      res.send(new_program);
    } else {
      return { status: false, code: 500, err: { msg: "program not updated " } };
    }
  } catch (err) {
    console.log("err", err);
  }
};
exports.updateRating = updateRating;
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.deleteById = deleteById;
