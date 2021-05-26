const mongoose = require("mongoose");
const Exercice = mongoose.model("Exercice",
    new mongoose.Schema({
    exerciceName : {type : String , required : true },
    constraint :{type : String , required : true } 
}));
exports.Exercice=Exercice;