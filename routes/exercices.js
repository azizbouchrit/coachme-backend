const express = require("express");
const mongoose = require("mongoose");
const router  = express.Router();
const exerciceCtr=require("../controllers/exercices");

router.get("/",exerciceCtr.getAll);
router.get("/:id",exerciceCtr.getById);
router.post("/",exerciceCtr.createnewexercice);
router.put("/:id",exerciceCtr.updateExercice);
router.delete("/:id",exerciceCtr.deleteById);

module.exports=router;