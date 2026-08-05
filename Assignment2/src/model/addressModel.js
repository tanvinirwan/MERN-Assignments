const mongoose = require('mongoose') ;
const addressSchema = mongoose.Schema({
state : {
    type : String ,
    required : true ,
    trim : true,
    maxlength : 264 
},
country : {
    type : String ,
    required : true ,
    trim : true,
    maxlength : 264 
},
street : {
    type : String ,
    required : true ,
    trim : true,
    maxlength : 264 
},
pincode : {
    type : Number ,
    required : true ,
    max : 2 
}
}) ;