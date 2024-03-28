import express from 'express'
import {User } from '../model/UserModel.js'
import bcrypt from 'bcrypt'
import Joi from 'joi'

const authRouter=express.Router()

authRouter.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });
		// console.log(await req.body)
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		const user_id=user.user_id;
		res.status(200).send({ data: token,user:user_id, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("email"),
		password: Joi.string().required().label("password"),
	});
	return schema.validate(data);
};


export default authRouter