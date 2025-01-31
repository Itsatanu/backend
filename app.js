import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express()


app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send("runing...")
})



import loginRoutes from './routes/login.routes.js'
import signupRoutes from './routes/signup.routes.js'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'


app.use("/api/login",loginRoutes)
app.use("/api/signup",signupRoutes)
app.use("/api/user",userRoutes)
app.use("/api/v1/admin",adminRoutes)


app.use('/',(req,res,next)=>{
    res.status(400).json({statusCode:404, message:'Unvalid path or URL'})
})

export default app