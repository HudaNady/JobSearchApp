import joi from 'joi'

export const jobSchema = joi.object({
    jobTitle: joi.string()
        .messages({message:'Job title is required and must be a string'})
        .required(),
    jobLocation: joi.string()
        .valid('onsite', 'remotly', 'hybrid')
        .messages({message:'Job location is required and must be one of: onsite, remotly, hybrid'})
        .required(),
    workingTime: joi.string()
        .valid('part-time', 'full-time')
        .messages({message:'Working time is required and  must be one of: part-time, full-time'})
        .required(),
    seniorityLevel: joi.string()
        .valid('junior', 'mid-level', 'senior', 'team-lead', 'CTO')
        .messages({message:'Seniority level is required and  must be one of: junior, mid-level, senior, team-lead, CTO'})
        .required(),
    jobDescription: joi.string()
        .messages({message:'Job description is required and must be a string'})
        .required(),
    technicalSkills: joi.array()
        .items(joi.string())
        .messages({message:'Technical skills must be an array of strings'}),
    softSkills: joi.array()
        .items(joi.string())
        .messages({message:'Soft skills must be an array of strings'})
});
export const updatejobSchema = joi.object({
    jobTitle: joi.string()
        .messages({message:'Job title must be a string'}),
    jobLocation: joi.string()
        .valid('onsite', 'remotly', 'hybrid')
        .messages({message:'Job location must be one of: onsite, remotly, hybrid'}),
    workingTime: joi.string()
        .valid('part-time', 'full-time')
        .messages({message:'Working time  must be one of: part-time, full-time'}),
    seniorityLevel: joi.string()
        .valid('junior', 'mid-level', 'senior', 'team-lead', 'CTO')
        .messages({message:'Seniority level  must be one of: junior, mid-level, senior, team-lead, CTO'}),
    jobDescription: joi.string()
        .messages({message:'Job description must be a string'}),
    technicalSkills: joi.array()
        .items(joi.string())
        .messages({message:'Technical skills must be an array of strings'}),
    softSkills: joi.array()
        .items(joi.string())
        .messages({message:'Soft skills must be an array of strings'})
});
