const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    notes:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        Type:String,
        default:""
    },
    Date:{
        type:Date,
        default:Date.now,
    },
  });
  module.exports=mongoose.model('notes',NotesSchema)