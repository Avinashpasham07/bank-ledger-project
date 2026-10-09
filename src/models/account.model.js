const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:User,
        required:[true,"Account must be associated with a user"],
        index:true
    },
    status:{
        enum:{
            values:["Active","Frozen","CLOSED"],
            message:"status can be either Active or Frozen or Closed"
        }
    },
    currency:{
        type:String,
        required:[true,"currency is required for creating an account"],
        default:"INR"
    },
},{
    timestamps:true
})

accountSchema.index({user:1,status:1})

const accountModel = mongoose.model("account",accountSchema)
module.exports = accountModel