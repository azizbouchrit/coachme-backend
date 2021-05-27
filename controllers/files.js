const { Files } = require("../models/file");
const mongoose = require("mongoose");
const express = require("express");

const getAll = async (req, res) => {
  try {
    const files = await Files.find();
    if (!files) {
      return res.status(404).send("not found");
    }
    res.send(files);
  } catch (err) {
    console.log("err", err);
  }
};

const getById = async (req, res) => {
  try {
    const files = await Files.findById(req.params.id);
    if (!files) {
      return res.statut(404).send("not found");
    }
    res.send(files);
  } catch (err) {
    console.log("err", err);
  }
};

const createnewfile = async (req, res) => {
  try {
    let file = new Files({
      // idExercice: req.body.idExercice,
      fileName: req.body.fileName,
      pathFile: req.body.pathFile,
      contentType: req.body.contentType,
    });
    file = await file.save();
    res.send(file);
  } catch (err) {
    console.log("err", err);
  }
};

const updateFile = async (req, res) => {
  try {
    const file = await Files.findByIdAndUpadate(req.params.id, {
      idExercice: req.body.idExercice,
      fileName: req.body.fileName,
      pathFile: req.body.pathFile,
      contentType: req.body.contentType,
    });
    if (!file) {
      return res.status(404).send("not found");
    }
    res.send(file);
  } catch (err) {
    console.log("err", err);
  }
};

const deleteFileById = async (req, res) => {
  try {
    const file = await Files.findByIdAndRemove(req.params.id);
    if (!file) {
      return res.status(404).send("not found");
    }
    res.send(file);
  } catch (err) {
    console.log("err", err);
  }
};

exports.getAll = getAll;
exports.getById = getById;
exports.createnewfile = createnewfile;
exports.updateFile = updateFile;
exports.deleteFileById = deleteFileById;
