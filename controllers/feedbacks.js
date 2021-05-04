const {Feedback} = require("../models/feedback");
const mongoose = require("mongoose");
const express = require("express");

const getAll= async (req,res)=>{
    try {
        const feedbacks = await Feedback.find();
        if(!feedbacks){
            return res.status(404).send("feedback not found ");
        
        }
        res.send(feedbacks);
        }
        catch(err) {
            console.log('err',err);

        }
    };
const getById = async (req , res)=>{
    try {
        const feedbacks = await Feedback.findById(req.params.id);
        if(!feedbacks)
        { return res.status(404).send("feedback with id  not found");}
        res.send(feedbacks);
    }
    catch (err){ console.lod("err",err);}
};
const createnewfeedback = async (req,res)=>{
   
    try {
       let feedback = new Feedback({
           idProg : req.body.idProg,
           idUser : req.body.idUser,
           FeedbackValues :req.body.FeedbackValues
               });
       feedback = await feedback.save();
       res.send(feedback);
    }
    catch(err){
        console.log("err", err);
    }
};
const updatefeedback = async (req,res)=>{
  //validation
  try {
      const feedback = await Feedback.findByIdAndUpdate(req.params.id,{
          idProg : req.body.idProg,
          idUser : req.body.idUser,
          FeedbackValues :req.body.FeedbackValues
       });
      if(!feedback)
      {
          return res.status(404).send("feedback with id not found ");
      }
     res.send(feedback); 
  }
  catch(err){
      console.log("err",err);
  }
};

const deleteById = async (req,res)=>{
    try {
        const feedback = await Feedback.findByIdAndRemove(req.params.id) ;
        if (!feedback){
            return res.status(404).send("feedback with id not found");
        }
     res.send(feedback);

    }
    catch(err){
        console.log("err",err);
    }
};

exports.getAll = getAll;
exports.getById=getById;
exports.createnewfeedback = createnewfeedback;  
exports.updatefeedback=updatefeedback;
exports.deleteById=deleteById;
