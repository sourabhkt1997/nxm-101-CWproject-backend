let jwt=require("jsonwebtoken")


let auth=(req,res,next)=>{
    let token=req.headers.authorization
       
    if(token){
        let decoded=jwt.verify(token.split(" ")[1],"sourabh")
        if(decoded){
            req.body.user
        }
    }


}