const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required for creating an user"],
        trim:true,
        lowercase:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address"],
        unique:[true,"Email already exists"]
    },
    name:{
        type:String,
        required:[true,"Name is required for creating an user"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required for creating an user"],
        minlength:[6,"Password must be atleast 6 characters long"],
        select:false
    },
    dob:{
        type:Date,
        required:false
    }
},{
    timestamps:true
})

// Hashing password using bcrypt.js
userSchema.pre("save", async function() {
    if(!this.isModified("password")){
        return;
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model("User",userSchema)  

module.exports = userModel