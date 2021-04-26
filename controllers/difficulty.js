const Difficulty = require("../models/Difficulty");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

exports.findAll = async (req, res) => {
    try {
    const difficulties = await Difficulty.find();
    res.send(difficulties);
    } catch (error) {
    res.status(500).send({
    message: error.message || "Some error occured while retrieving difficulty",
    });
    }
};

exports.create= async (req, res) => {
try {
    let difficulty = new Difficulty({
        difficultyName: req.body.difficultyName,
        numberPoints: req.body.numberPoints,
    });
    difficulty = await difficulty.save();
    res.send(difficulty);
    } catch (err) {
    console.log("err", err);
    }
};

exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
    let difficulty = await Difficulty.findById(id);
    res.send(difficulty);
    } catch (error) {
    res.status(500).send(error);
    }
};

exports.update = async (req, res) => {
    try {
    const difficulty = await Difficulty.findByIdAndUpdate(req.params.id, {
        difficultyName: req.body.difficultyName,
        numberPoints: req.body.numberPoints,
        new: true,
    });
    if (!difficulty)
        return {
        status: false,
        code: 404,
        err: { msg: "Difficulty not found ! " },
        };
    res.send(difficulty);
    } catch (err) {
    console.log("err", err);
    }
};

exports.deleteById = async (req, res) => {
    try {
    let id = req.params.id;

    await Difficulty.findByIdAndDelete(req.params.id);

    res.status(200).send();
    } catch (error) {
    res.status(500).send(error);
    }
};