import mongoose from "mongoose";

// const textFieldSchema=mongoose.Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     value:{
//         type:String,
//         required:true
//     },
//     colour:{
//         type:String,
//         required:true
//     },
//     id:{
//         type:Number,
//         required:true
//     },
//     x:{
//         type:Number,
//         required:true
//     },
//     y:{
//         type:Number,
//         required:true
//     }
// })


const document=new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    textFields:{
        type:[{
            title:{
                type:String,
                required:true
            },
            value:{
                type:String,
                required:true
            },
            colour:{
                type:String,
                required:true
            },
            id:{
                type:Number,
                required:true
            },
            x:{
                type:Number,
                required:true
            },
            y:{
                type:Number,
                required:true
            }
        }],
        default:[]
    }
})

export default mongoose.model("document",document)
