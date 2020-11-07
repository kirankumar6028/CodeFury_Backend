const mongoose = require("mongoose");

const { Schema } = mongoose;
const validateUser = require("./validators/workerInfoValidator");

const workerSchema=new Schema({
	skill:{
     type:[String],
    },
    expertise:{
     type:[Number],
    },
	city:{
		type: String,	
		trim: true,
    },
	locality:{
		type: String,	
		trim: true,
    },
    Address:{
        type:String,
    },
	contactNumber:{
		type: Number,	
	},
	chargePerHour:{
		type: Number,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    img:{
        type:String
    },

});
const Worker=mongoose.model("workers",workerSchema);

module.exports=Worker;