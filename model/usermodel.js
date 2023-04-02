let mongoose=require("mongoose")

let userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    cartlist:[{
        id:String,
        quantity:Number
    }],
    buylist:[{
        id:String,
        quantity:Number
    }],
    purchaselist:[{
        id:String,
        dateof_purchase:String,
        _id:false
    }]
},{
    versionKey:false
})

UserModel=mongoose.model("userData",userSchema)

module.exports={UserModel}