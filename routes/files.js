const express = require("express");
const mongoose = require("mongoose");
const router  = express.Router();
const fileCtr=require("../controllers/files");

router.get("/",fileCtr.getAll);
router.get("/:id",fileCtr.getById);
router.post("/",fileCtr.createnewfile);
router.put("/:id",fileCtr.updateFile);
router.delete("/:id",fileCtr.deleteFileById);

module.exports=router;