import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import PasswordComplexity from 'joi-password-complexity'
const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    user_id:{type:String}
})



userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
}

const User = mongoose.model("user",userSchema)


const validate = (data) =>{
    const Schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("email"),
        password: PasswordComplexity().required().label("Password"),
    });
    return Schema.validate(data)
}

export {User,validate}