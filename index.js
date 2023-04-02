let express=require("express")
let app=express()

let {connection}=require("./db")
let{userrouter}=require("./router/user.router")
let {productrouter}=require("./router/product.router")
require("dotenv").config()
let cors=require("cors")
app.use(cors())

app.use(express.json())

app.use("/users",userrouter)
app.use("/products",productrouter)






app.listen(process.env.port,async(req,res)=>{

    try{
       await connection
       console.log(`server is running in port ${process.env.port}`)
    }
    catch(err)
    {
        console.log(err)
    }
})