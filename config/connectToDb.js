 const mongoose = require("mongoose");

 mongoose.set("strictQuery", false);
 
 module.exports = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI).then(()=>
        console.log("Connected To MongoDB ^_^")
        )
    }catch(error){
        console.log("Connection Failed To MongoDB!", error);
        process.exit();
    }
 }