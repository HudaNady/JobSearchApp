
import mongoose, { get } from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3
    },
    lastName:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    recoveryEmail:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        required:true,
        enum:["user","company_HR"]
    },
    status:{
        type:String,
        enum:["online","ofline"],
        default:"ofline"
    },
    code:{
        type:Number
    },
    timesstamps:{
        type:Boolean,
        default:true
    }
})
userSchema.virtual('userName').get(function(){
    return `${this.firstName} ${this.lastName}`
})
userSchema.set('toJSON',{virtuals:true})

const User=mongoose.model('User',userSchema)
export default User