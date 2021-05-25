const Subscription = require("../models/Subscription");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

exports.findAll = async (req, res) => {
    try {
    const subscriptions = await Subscription.find();
    res.send(subscriptions);
    } catch (error) {
    res.status(500).send({
    message: error.message || "Some error occured while retrieving subscription",
    });
    }
};

exports.create = async (req, res) => {
try {
    let subscription = new Subscription({
        subscriptionDate: req.body.subscriptionDate,
        active: req.body.active,
    });
    subscription = await subscription.save();
    res.send(subscription);
    } catch (err) {
    console.log("err", err);
    }
};

exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
    let subscription = await Subscription.findById(id);
    res.send(subscription);
    } catch (error) {
    res.status(500).send(error);
    }
};

exports.update = async (req, res) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, {
            subscriptionDate: req.body.subscriptionDate,
            active: req.body.active,
            new: true,
        });
        if (!subscription)
            return {
            status: false,
            code: 404,
            err: { msg: "the subscription with given id not found" },
            };
        res.send(subscription);
        } catch (err) {
        console.log("err", err);
        }
    };

exports.delete = async (req, res) => {
    try {
    let id = req.params.id;

    await Subscription.findByIdAndDelete(req.params.id);

    res.status(200).send();
    } catch (error) {
    res.status(500).send(error);
    }
};