const express = require("express");
const mongoose = require("mongoose");
const router  = express.Router();
const evolutionCtr=require("../controllers/evolutions");

router.get("/getAll",evolutionCtr.getAll);
router.get("/getbyid/:id",evolutionCtr.getById);
router.post("/createnewevolution",evolutionCtr.createnewevolution);
router.put("/update/:id",evolutionCtr.updateEvolution);
router.delete("/delete/:id",evolutionCtr.deleteEvolutionbyId);

module.exports=router;