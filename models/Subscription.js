const Joi = require("joi");
const mongoose = require("mongoose");
const Subscription = new mongoose.Schema({

    subscriptionDate:
    { type: Date, 
        default: Date.now },
    active: Boolean,
},
    { timestamps: true }
);


module.exports = Subscription;