
let express=require("express")
let productrouter=express.Router()
let {ProductModel}=require("../model/productmodel")


productrouter.post("/addproduct",async(req,res)=>{
    
    try{
        let data=new ProductModel(req.body)
        await data.save()
        res.status(400).send({'messgae':"new product added"})
    }
    catch(err){
        res.status(400).send({'messgae':err.messgae})
    }
})

productrouter.get("/findproduct",async(req,res)=>{
    let{proname}=req.query
    console.log(proname)
    try{
       let data= await ProductModel.find({$or:[{title:{$regex:proname,$options:"i"}},{category:{$regex:proname,$options:"i"}}]})
       res.status(200).send(data)
    }
    catch(err){
        res.status(400).send({'messgae':err.messgae})  
    }
})

productrouter.get("/:id",async(req,res)=>{
    let {id}=req.params
    try{
       let data= await ProductModel.find({_id:id})
       res.status(200).send(data)
    }
    catch(err){
        res.status(400).send({'messgae':err.messgae})  
    }
})

productrouter.get("/",async(req,res)=>{
    let {page}=req.query
    console.log(page)
    let limit=2
    let skip=(+page-1)*limit
    try{
        if(page){
       let data= await ProductModel.find().skip(skip).limit(limit)
       res.status(200).send(data)
        }
        else{
            let data= await ProductModel.find()
       res.status(200).send(data)
        }
    }
    catch(err){
        res.status(400).send({'messgae':err.messgae})  
    }
})




module.exports={productrouter}