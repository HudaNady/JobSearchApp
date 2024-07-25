import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    jobId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job', 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    userTechnicalSkills: [String],
    userSoftSkills: [String],
    userResume: { 
        type: String, 
        required: true 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
applicationSchema.post('init',(doc)=>{
    doc.userResume='http://localhost:3000/uploads/' + doc.userResume
})

const Application = mongoose.model('Application', applicationSchema);
export default Application