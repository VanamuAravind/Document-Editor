import mongoose from "mongoose";

const connection=()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };
    try {
        mongoose.connect(process.env.DB,connectionParams)
        console.log("database is connected")
    } catch (error) {
        console.log(error)
        console.log("database is not connected")
    }
}
export default connection
