const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
   
   title:{
    type:String,
trim:true,
   },


})

module.exports = mongoose.model("Course",courseSchema);