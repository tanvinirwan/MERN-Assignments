const mongoose = require('mongoose') ;
const productSchema = mongoose.Schema({
    name:{
        type : "String" ,
        required : true,
        trim : true ,
        minlength : 3 ,
        maxlength : 100
    },
    description:{
        type : String ,
        required : true,
        trim : true ,
        minlength : 3 ,
        maxlength : 200
    },
    price:{
        type : Number ,
        required : true,
        minlength : 0
    },
    category:{
        type : String ,
        enum :["Electronics","Clothing","Books","Home"],
        required : true,
        trim : true ,
        minlength : 3 ,
        maxlength : 100
    }

});

const ProductModel = mongoose.model("product",productSchema) ;
module.exports = ProductModel;