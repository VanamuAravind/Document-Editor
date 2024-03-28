import express from 'express'
import {User,validate} from '../model/UserModel.js'
import bcrypt from 'bcrypt'
const userRoute = express.Router()
import { randomBytes } from 'crypto';
const generateUserID = function(){
    const randomBytesBuffer = randomBytes(16); // Generate 16 random bytes
    const userID = randomBytesBuffer.toString('hex'); // Convert the bytes to hexadecimal string
    return userID; 
}
userRoute.post('/', async(req,res)=>{
    try {
        const {error} = validate(req.body)
        if(error){
            return res.status(400).send({message:error.details[0].message});
        }
        const user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(409).send({message:"User with given email already exists"})
        }
        const salt=await bcrypt.genSalt(Number(10))
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        const user_id=generateUserID()
        await new User({...req.body,password:hashedPassword,user_id:user_id}).save()
        res.status(201).send({message:"User created successfully"})
    } catch (error) {
        res.status(500).send({message:"Internal server error"})
    }
})


export default userRoute