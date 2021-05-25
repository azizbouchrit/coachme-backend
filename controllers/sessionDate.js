const { SessionDate, validate } = require("../models/SessionDate");
const { Subscription } = require("../models/Subscription");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

exports.getAll = async (req, res) => {
    try {
    const sessions = await SessionDate.find();
    if (!sessions)
        return { status: false, code: 409, err: { msg: " Session not found ! " } };
    res.send(sessions);
    } catch (err) {
    console.log("err", err);
    }
};
exports.getById = async (req, res) => {
    try {
    const session = await SessionDate.findById(req.params.id);
    if (!session)
        return {
        status: false,
        code: 404,
        err: { msg: "Session with given id not found" },
        };
    res.send(session);
    } catch (err) {
    console.log("err", err);
    }
};
exports.create= async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
    const sub = await Subscription.findById(req.body.subscriptionId);
    console.log(sub);
    if (!sub) return res.status(400).send("Invalid subscription ! ");

    let session = new SessionDate({
        date: req.body.date,
        chechek : req.body.checked,
        subscriptionId: sub._id,
    });
    session = await session.save();
    res.send(session);
    } catch (err) {
    console.log("err", err);
    }
};
exports.update = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
    const sub = await Subscription.findById(req.body.subscriptionId);
    if (!sub) return res.status(400).send("Invalid subscription.");

    const subscri = await Subscription.findByIdAndUpdate(req.params.id, {
        date: req.body.date,
        chechek : req.body.checked,
        subscriptionId: subscri._id,
    });
    if (!session)
        return {
        status: false,
        code: 404,
        err: { msg: "Session not found !" },
        };
    res.send(session);
    } catch (err) {
    console.log("err", err);
    }
};
exports.deleteById = async (req, res) => {
    try {
    const session = await SessionsDate.findByIdAndRemove(req.params.id);
    if (!session)
        return {
        status: false,
        code: 404,
        err: { msg: "Session not found !" },
        };
    } catch (err) {
    console.log("err", err);
    }
};


