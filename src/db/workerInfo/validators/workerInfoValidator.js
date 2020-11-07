const { func } = require("joi");

function validator(input){
    if(input >0 && input <5){
      return true;
    }
    return false;
}

module.exports=validator;