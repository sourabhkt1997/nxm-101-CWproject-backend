let express=require("express")
let userrouter=express.Router()
const bcrypt = require('bcrypt')
let {UserModel}=require("../model/usermodel")
let jwt = require('jsonwebtoken')


userrouter.post("/register",async(req,res)=>{
    console.log(req.body)
        let {email,password,username,cartlist,buylist,purchaselist}=req.body
        try{
            let data=await UserModel.findOne({email})
            if(data){
                res.status(400).send({"message":"User already exist, please login"})
            } 
        else{
        bcrypt.hash(password,5,async(err, hash)=>{
            let userdata= new UserModel({
                email:email,
                password:hash,
                username:username,
                cartlist:cartlist,
                buylist:buylist,
                purchaselist:purchaselist
            })
            await userdata.save()
            console.log(userdata,"userdata")
            res.status(200).send({"message":"signup successfull"})
        });
        }
    }
    catch(err){
        res.status(400).send({"message":err.message})
    }
})

userrouter.post("/login",async(req,res)=>{
    let {email,password}=req.body
   try{
      let data=await UserModel.find({email})
      if(data.length>0){
          bcrypt.compare(password,data[0].password,(err, result)=>{
              if(result){
                  res.status(200).send({"message":"login successfull",
              "token":token = jwt.sign({userid:data[0]._id},'sourabh')})
              }
              else{
                  res.status(400).send({"message":"wrong credentials"})
              }
          })
      }
      else{
          res.status(400).send({"message":"register first"})
      }

   }
   catch(err){
      res.status(400).send({"message":err.message})
   }

})

userrouter.get("/",async(req,res)=>{
      let token=req.headers.authorization.split(" ")[1]
      let decoded=jwt.verify(token,"sourabh")
    try{
       if(decoded){
        let data=await UserModel.find({_id:decoded.userid})
        console.log(data,"******")
        res.status(200).send(data)
       } 
       else{
        res.status(400).send({"messgae":"no user found"})
       }

    }
    catch(err){
        res.status(400).send({"message":err.message})
    }
})
userrouter.get("/find/:id",async(req,res)=>{
    let {id}=req.params
    let token=req.headers.authorization.split(" ")[1]
    console.log(token)
    let decoded=jwt.verify(token,"sourabh")
  try{
     if(decoded){
      let data=await UserModel.find({_id:id})
      console.log(data,"******")
      res.status(200).send(data)
     } 
     else{
      res.status(400).send({"messgae":"no user found"})
     }

  }
  catch(err){
      res.status(400).send({"message":err.message})
  }
})

userrouter.patch("/useraccount/:id",async(req,res)=>{
     let {id}=req.params
     let payload=req.body
    let token=req.headers.authorization.split(" ")[1]
    let decoded=jwt.verify(token,"sourabh")
  try{
     if(decoded){
      let data=await UserModel.findByIdAndUpdate({_id:id},payload)
      res.status(200).send({"messgae":" updated"})
     } 
     else{
      res.status(400).send({"messgae":"cant update"})
     }

  }
  catch(err){
      res.status(400).send({"message":err.message})
  }
})






module.exports={userrouter}