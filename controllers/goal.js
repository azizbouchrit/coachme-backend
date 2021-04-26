const express = require("express");
const Goal = require("../models/Goal");
const router = express.Router();

exports.findAll = async (req, res) => {
    try {
    const goals = await Goal.find();
    res.send(goals);
    } catch (error) {
    res.status(500).send({
    message: error.message || "Some error occured while retrieving goal",
    });
    }
};

exports.create= async (req, res) => {
    try {
        let goal = new Goal({
            goalName: req.body.goalName,
        });
        goal = await goal.save();
        res.send(goal);
        } catch (err) {
        console.log("err", err);
        }
    };

exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
    let goal = await Goal.findById(id);
    res.send(goal);
    } catch (error) {
    res.status(500).send(error);
    }
};

exports.update = async (req, res) => {
    try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, {
        goalName: req.body.goalName,
        new: true,
    });
    if (!goal)
        return {
        status: false,
        code: 404,
        err: { msg: "Goal not found !" },
        };
    res.send(goal);
    } catch (err) {
    console.log("err", err);
    }
};

exports.deleteById = async (req, res) => {
    try {
    let id = req.params.id;

    await Goal.findByIdAndDelete(req.params.id);

    res.status(200).send();
    } catch (error) {
    res.status(500).send(error);
    }
};