const mongoose = require('mongoose');
const Feedback = mongoose.model("feedbakc",
new mongoose.Schema({
    idProg : {//type : mongoose.Schema.Types.ObjectId,
    //ref :'Program' , 
    type : String , required : true },
    idUser : {//type : mongoose.Schema.Types.ObjectId,
    //ref :'User' ,
    type : String ,  required : true },
    FeedbackValues : {type : Number , required : true } ,

}));
exports.Feedback=Feedback;