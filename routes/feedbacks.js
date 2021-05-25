const express = require("express");
const mongoose = require("mongoose");
const router  = express.Router();
const feedbackCtr = require("../controllers/feedbacks");


router.get("/getAll",feedbackCtr.getAll);
router.get("/getById/:id",feedbackCtr.getById);
router.post("/createnewfeedback",feedbackCtr.createnewfeedback);
router.put('/updatefeedback/:id',feedbackCtr.updatefeedback);
router.delete('/deletefeedback/:id',feedbackCtr.deleteById);

module.exports=router;