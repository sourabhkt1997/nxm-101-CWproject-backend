let mongoose=require("mongoose")

let producrSchema=mongoose.Schema({
    title:String,
    image:[String],
    price:Number,
    category:String,
    gender:String,
    rateduser:[{
        id:String,
        rating:Number
    }],
    rating:Number,
    sellingCount:Number,
    size:Number,
},{
    versionKey:false
})

ProductModel=mongoose.model("productData",producrSchema)

module.exports={ProductModel}