import joi from 'joi'


export const companySchema = joi.object({
    companyName: joi.string().min(3)
        .messages({error:'Company name is required and must be a string'})
        .required(),
        description: joi.string().min(3)
        .messages({error:'Description is required and must be a string'})
        .required(),
        industry: joi.string().min(3)
        .messages({error:'Description is required and must be a string'})
        .required(),
        address: joi.string().min(3)
        .required(),
        numberOfEmployees: joi.number()
        .integer()
        .min(11)
        .max(20)
        .messages({error:'Number of employees is required and must be number in range 11:20'})
        .required(),
        companyEmail: joi.string()
        .email()
        .messages({error:'Company email is required and must be a valid email address'})
        .required(),
});
export const updateCompanySchema = joi.object({
    companyName: joi.string().min(3)
        .messages({error:'Company name must be a string'}),
        description: joi.string().min(3)
        .messages({error:'Description must be a string'}),
        industry: joi.string().min(3)
        .messages({error:'Description must be a string'}),
        address: joi.string().min(3),
        numberOfEmployees: joi.number()
        .integer()
        .min(11)
        .max(20)
        .messages({error:'Number of employees must be number in range 11:20'}),
        companyEmail: joi.string()
        .email()
        .messages({error:'Company email must be a valid email address'}),
});

