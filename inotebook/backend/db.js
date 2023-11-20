// database sa connect hona walwa code 
// how to condect basic mogodb server
const mongoose=require('mongoose');


const mongoURI="mongodb://localhost:27017/inotebook"  


const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("**************Connected to mongo succesgully *************");
    })
}


module.exports=connectToMongo;