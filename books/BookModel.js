const mongoose = require("mongoose");

mongoose.model('Book',{
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    numberofPages:{
        type:Number,
        require:true
    },
    publisher:{
        type:String,
        require:true
    }
})