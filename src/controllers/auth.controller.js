const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")

/**
 * - user register controller
 * - Method : POST 
 * - Endpoint : /api/auth/register
 */
async function userRegisterController(req,res){ 
    const{email,password,name} = req.body
    const isExists = await userModel.findOne({ 
        email:email
    })
    if(isExists){
        return res.status(422).json({
            message:"User already exists with this email", 
            status:false,  
        })
    }
    const user = await userModel.create({
        email:email,
        password:password,
        name:name
    })
    const token = jwt.sign({
        userId:user._id,
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"3d"
    })
    res.cookie("authtoken",token) 
    res.status(201).json({
        message:"User created successfully", 
        status:true,
        user:{
            _id:user._id,
            name:user.name,
            email:user.email
        },
        token
    })

    await emailService.sendRegistrationEmail(user.email,user.name)
}

/**
 * - user login controller
 * - Method : POST 
 * - Endpoint : /api/auth/login
 */
async function userLoginController(req,res){
    const{email,password} = req.body

    const user = await userModel.findOne({
        email
    }).select("+password")
    if(!user){
        return res.status(401).json({
            message:"email or password is invaild"
        }) 
    }
    const isvaildpassword = await user.comparePassword(password)
    if(!isvaildpassword){
        return res.status(401).json({
            message:"email or password is invaild"
        })
    }
    const token = jwt.sign({
        userId:user._id,
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"3d"
    })
    res.cookie("authtoken",token) 
    res.status(202).json({
        message:"User login successfully", 
        status:true,
        user:{
            _id:user._id,
            email:user.email
        },
        token
    })
    await emailService.sendLoginEmail(user.email,user.name)
}

/**
 * - user login controller
 * - Method : POST 
 * - Endpoint : /api/auth/login
 */
module.exports = {userRegisterController,userLoginController} 














