import joi from 'joi'

const applicationSchema = joi.object({
    jobId: joi.string()
        .length(24)
        .hex()
        .messages({messages:'Job ID is required , must be valid hexadecimal string and must be 24 characters long'})
        .required(),
    userTechnicalSkills: joi.array()
        .items(joi.string())
        .messages({messages:'User technical skills must be an array of string'}),
    userSoftSkills: joi.array()
        .items(joi.string())
        .messages({messages:'User technical skills must be an array of string'}),
    userResume: joi.string()
});

export default applicationSchema