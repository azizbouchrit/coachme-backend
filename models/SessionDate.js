const Joi = require("joi");
const mongoose = require("mongoose");
const SessionDate = mongoose.model( "SessionDate",new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    checked: Boolean,
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required: true,
    },
    })
);
function validateSessionDate(sessionDate) {
    const schema = {

    subscriptionId: Joi.string().required(),
    };

    return Joi.validate(sessionDate, schema);
}
exports.SessionDate = SessionDate;
exports.validate = validateSessionDate;
