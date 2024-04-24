import express from 'express'
import mongoose from 'mongoose'
import document  from '../model/DocumentModel.js'
const documentRouter=express.Router()

documentRouter.post("/api/savedocument",async(req,res)=>{
    try {
        const {fileName,textFields,user_id}=req.body
        // console.log(req.body)
        const doc=await document.findOne({fileName:fileName})
        // console.log(doc)
        const today=new Date()
        const todayDate = today.toLocaleDateString();
        if(doc){
            
            document.findByIdAndUpdate({_id:doc._id},{textFields:textFields,date:todayDate})
            .then(updatedDoc=>{
                res.send({message:"File saved successfully"})
            })
            .catch(error => {
                console.log(error)
            })
        }
        else{
            
            await new document({user_id:user_id,date:todayDate,fileName:fileName,textFields:textFields}).save()
            res.send({message:"document saved successfully"})
        }
    } catch (error) {
        console.log(error)
        res.send({message:"internal server error"})
    }
})
documentRouter.post("/api/getdocuments",async(req,res)=>{
    try {
        const {user_id}=req.body
        const docs=await document.find({user_id:user_id})
        console.log(docs)
        res.send(docs)
    } catch (error) {
        console.log(error)
    }
})
export default documentRouter