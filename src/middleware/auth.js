import jwt from "jsonwebtoken";
import AppError from "../utils/Error.js";

const auth=async(req,res,next)=>{
        const authorization=req.headers.authorization
        const token=await authorization.split('keyBarer_')[1]
        const payload= jwt.verify(token,'signtureAyhagaaa')
        if(!authorization){
            return next(new AppError("token must send in headers",400))
        }   
        if(!payload){
            res.status(400).json({message:'invalid payload'})
        }
        req.user=payload
        return next()
}
export default auth