const { Session, validate } = require("../models/Session");
const { Week } = require("../models/Week");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const getAll = async (req, res) => {
  try {
    const sessions = await Session.find();
    if (!sessions)
      return { status: false, code: 409, err: { msg: "no session found " } };
    res.send(sessions);
  } catch (err) {
    console.log("err", err);
  }
};
const getById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session)
      return {
        status: false,
        code: 404,
        err: { msg: "the session with given id not found" },
      };
    res.send(session);
  } catch (err) {
    console.log("err", err);
  }
};
const create = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const week = await Week.findById(req.body.weekId);
    if (!week) return res.status(400).send("Invalid week.");

    let session = new Session({
      sessionName: req.body.sessionName,
      weekId: week._id,
    });
    session = await session.save();
    res.send(session);
  } catch (err) {
    console.log("err", err);
  }
};
const update = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const week = await Week.findById(req.body.weekId);
    if (!week) return res.status(400).send("Invalid week.");

    const session = await Session.findByIdAndUpdate(req.params.id, {
      sessionName: req.body.sessionName,
      weekId: req.body.weekId,
    });
    if (!session)
      return {
        status: false,
        code: 404,
        err: { msg: "the session with given id not found" },
      };
    res.send(session);
  } catch (err) {
    console.log("err", err);
  }
};
const deleteById = async (req, res) => {
  try {
    const session = await Session.findByIdAndRemove(req.params.id);
    if (!session)
      return {
        status: false,
        code: 404,
        err: { msg: "the session with given id not found" },
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
