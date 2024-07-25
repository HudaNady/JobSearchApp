const validation=(schema)=>{
    return (req,res,next)=>{
        const {error} =schema.validate({...req.body,...req.params,...req.query},{abortEarly:false})
        if(error){
            return res.status(400).json({message:'validation error',error:error.details})
        }
        return next()
    }
}

export default validation