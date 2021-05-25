const {Evolution} = require("../models/evolution");
const mongoose = require("mongoose");
const express = require("express");

const getAll= async(req,res)=>{
    try {
        
    const evolutions = await Evolution.find();
    if(!evolutions){ return res.status(404).send("not found");}
    res.send(evolutions);
    }
    catch(err){ console.log("err",err);}

};

const getById = async(req,res)=>{
try {
    const evolution = await Evolution.findById(req.params.id );
    if(!evolution){return res.status(404).Send("evolution with id not found");}
    res.send(evolution);
}
catch(err){ console.log("err",err);}
};

const createnewevolution = async (req,res)=>{
try {
    let  evolution = new Evolution ({
        idUser : req.body.idUser,
        EvolutionsValues : req.body.EvolutionsValues ,
        date : req.body.date
    });
    evolution = await evolution.save();
    res.send(evolution);
}
catch(err){console.log("err",err);}
};

 const updateEvolution = async (req,res)=>{
try {
const evolution = await Evolution.findByIdAndUpdate(req.params.id,{
    idUser : req.body.idUser,
    EvolutionsValues : req.body.EvolutionsValues,
    date : req.body.date
});
if(!evolution){ return req.status(404).send("evolution with id not found");}
res.send(evolution);
}
catch(err){console.log("err",err);}
 };

 const deleteEvolutionbyId = async (req,res)=>{
 try {
     const evolution = await Evolution.findByIdAndRemove(req.params.id);
     if(!evolution){return res.status(404).send("evolution with id not found");}
     res.send(evolution);
 }
 catch(err){console.log("err",err);}
 };
exports.getAll=getAll;
exports.getById=getById;
exports.createnewevolution=createnewevolution;
exports.updateEvolution=updateEvolution;
exports.deleteEvolutionbyId=deleteEvolutionbyId;

