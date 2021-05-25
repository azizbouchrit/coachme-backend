const {Exercice} = require("../models/exercice");
const mongoose = require("mongoose");
const express = require("express");

const getAll = async(req,res)=>{
    try {
        const exercices = await Exercice.find();
        if(!exercices){
            return res.status(404).send("aucun feedback was found ");
        }
        res.send(exercices);

    }
    catch(err){
        console.log("err",err);
    }



};

const getById = async (req,res)=>{
try {
    const exercices = await Exercice.findById(req.params.id);
    if(!exercices){
        return res.status(404).send("the feedback given with id was not found ");
    }
    res.send(exercices);
}
catch(err){
    console.log("err",err);
}
};
 const createnewexercice = async(req,res)=>{
     try {
         let exercice = new Exercice({
             exerciceName : req.body.exerciceName,
             constraint : req.body.constraint
         });
         exercice = await exercice.save();
         res.send(exercice);

     }
 catch(err){
     console.log("err",err);

 }
 };
 const updateExercice = async(req,res)=>{
     try {
         const exercice = await Exercice.findByIdAndUpdate(req.params.id,{
             exerciceName : req.body.exerciceName,
             constraint : req.body.constraint
         });
         if(!exercice){
             return res.status(404).send("exercice with id not found");
         }
         res.send(exercice);


     }
    catch(err){
        console.log("err",err);
    }
 };
 
 const deleteById = async(req,res)=>{
     try {
         const exercice = await Exercice.findByIdAndRemove(req.params.id);
         if(!exercice){return res.status(404).send("exercice with id not found");}
         res.send(exercice);
     }
     catch(err){ console.log("err",err);}
 };

 

exports.getAll=getAll;
exports.getById=getById;
exports.createnewexercice = createnewexercice;
exports.updateExercice = updateExercice;
exports.deleteById =deleteById;