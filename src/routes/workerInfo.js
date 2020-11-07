const express=require("express");
const bodyParser = require("body-parser");
const router = new express.Router();
const authUser = require("../middleware/authUser");
var file = require("../middleware/imageFilter");
const Worker=require("../db/workerInfo/workerInfo");

router.use(bodyParser.urlencoded({ extended: true }));



router.patch("/workerInfo",authUser,async (req,res) => {
    try{
        const worker= await Worker.update(
            {owner:req.user._id},
            {$set:req.body}
      );
      res.send(worker);
    }catch(err){
        res.send(err);
    }
    
});

router.patch("/workerInfo/img", authUser, file, async (req, res) => {
    try {
      const worker = await Worker.update(
        { owner: req.user._id },
        { $set: { img: req.file.path } }
      );
      res.send(worker);
    } catch (err) {
      res.send(err);
    }
  });

  router.get("/workerInfo/:id", (req, res) => {
    Worker.find({owner:req.params.id},(err, info) => {
      if (!err) {
        res.send(info);
      } else {
        res.send(err);
      }
    });
  });


module.exports=router;