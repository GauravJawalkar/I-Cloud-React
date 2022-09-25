const  mongoose = require("mongoose");
const mongoURI='mongodb+srv://gaurav:gaurav@cluster0.1qflq.mongodb.net/backend?retryWrites=true&w=majority';


const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log('connection to Mongodb Atlas is sucessful');
    }).catch((err)=> console.log('no connection'))
}

module.exports=connectToMongo;