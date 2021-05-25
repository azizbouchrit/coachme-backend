const mongoose =require('mongoose');
const Evolution = mongoose.model("Evolution",
new mongoose.Schema({
    idUser : { //type : mongoose.Schema.Types.ObjectId,
        type : String ,
    ref : 'User', required : true }, 
    EvloutionsValues :{type : Number , required : true } ,
    date : {type : Date , required: true } 
})); 
exports.Evolution=Evolution;
