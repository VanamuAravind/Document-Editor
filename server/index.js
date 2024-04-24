import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connection from './DB.js'
import userRoute from './routes/users.js'
import authRouter from './routes/auth.js'
import documentRouter from './routes/document.js'
dotenv.config()
const app=express()

//connecting database
connection()

//middlewares
app.use(express.json())
app.use(cors())


//routes
app.use("/api/auth",authRouter)
app.use("/api/users",userRoute)
app.use(documentRouter)

const PORT=process.env.PORT||8080
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})