import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String, 
        required: true 
    },
    jobLocation: { 
        type: String, 
        required: true ,
        enum:["onsite","remotly","hybrid"]
    },
    workingTime: { 
        type: String, 
        required: true,
        enum:["part-time","full-time"]
    },
    seniorityLevel: { 
        type: String, 
        required: true,
        enum:["junior","mid-level","senior","team-lead","CTO"]
    },
    jobDescription: { 
        type: String, 
        required: true 
    },
    technicalSkills: [String],
    softSkills: [String],
    companyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company', 
        required: true 
    },
    addedBy: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
});

const Job = mongoose.model('Job', jobSchema);

export default Job
