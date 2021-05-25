const Joi = require("joi");
const mongoose = require("mongoose");
const Difficulty = new mongoose.Schema({

    difficultyName:
    { type: String,
            
},
    numberPoints : {
        type : Number,
        default : 0,
    },
});
module.exports = Difficulty;
