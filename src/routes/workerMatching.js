const express = require("express");
const router = new express.Router();
const auth = require("../middleware/authUser");
const Worker=require("../db/workerInfo/workerInfo");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/workerMatch",auth,async (req,res)=>{
    let skill=req.body.skill;
    console.log(skill);
try{
    const workerData=await Worker.aggregate([
        {
         

            $match:{
                $or:[
                    { skill: { $in: skill}},
                ] ,
            },                            
        },
        {
            $group: {
                _id: "$_id",
                img: { $first: "$img" },
                skill: { $first: "$skill" },
                city:{$first:"$city"},
                locality:{$first:"$locality"},
                Address:{$first:"$Address"},
                contactNumber:{$first:"$contactNumber"},
                charegPerHour:{$first:"$chargePerHour"},
                count: { $sum: 1 },
              },
        },
     ]);
     res.status(200).send(workerData);
}catch(err){
    console.log(err);
    res.status(400).send(err);
}   
})

module.exports=router;


