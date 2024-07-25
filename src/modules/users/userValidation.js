import joi from 'joi'

export const signUpSchema=joi.object({
    lastName:joi.string().lowercase().min(3).max(15).trim().messages({message:'First name is required and must be a string'}).required(),
    firstName:joi.string().lowercase().min(3).max(15).trim().message({message:'Last name is required and must be a string'}).required(),
    email:joi.string().email().messages({message:'Email is required and must be a valid email address'}).required(),
    password:joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).message('password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters ').required(),
    confirmPass:joi.string().valid(joi.ref('password')).messages({message:'Conrirm password not matched'}).required(),
    recoveryEmail:joi.string().email().messages({message:'Mobile number is required and must be valid mobile number'}).required(),
    mobileNumber:joi.string().pattern(/^01[0-2,5]{1}[0-9]{8}$/).messages({message:'Mobile number is required and must be valid mobile number'}).required(),
    DOB:joi.string().pattern( /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).messages({message:'Date of birth is required and must be a string in format "yyyy-mm-dd" '}).required(),
    rol:joi.string().valid('user', 'company_HR').messages({message:'Role is required and must beone of: user, company_HR'}).required()
})
export const loginSchema=joi.object({
    EmailorPhoneNumber: joi.alternatives()
    .try(
      joi.string().email().required().messages({message:'Email is required and must be a valid email address'}),
      joi.string().pattern(/^01[0-2,5]{1}[0-9]{8}$/).required().messages({message:'Mobile number is required and must be valid mobile number'}),
      joi.string().email().required().messages({message:'Mobile number is required and must be valid mobile number'})
    )
    .required()
    .messages({message:'Please provide a valid email, recovery email, or phone number'}),
    password:joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).message('password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters ').required()
})
export const updateUserSchema=joi.object({
  lastName:joi.string().lowercase().min(3).max(15).trim().messages({message:'First name must be a string'}),
  firstName:joi.string().lowercase().min(3).max(15).trim().message({message:'Last name must be a string'}),
  email:joi.string().email().messages({message:'Email must be a valid email address'}),
  recoveryEmail:joi.string().email().messages({message:'Mobile number must be valid mobile number'}),
  mobileNumber:joi.string().pattern(/^01[0-2,5]{1}[0-9]{8}$/).messages({message:'Mobile number must be valid mobile number'}),
  DOB:joi.string().pattern( /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).messages({message:'Date of birth must be a string in format "yyyy-mm-dd" '}),
  rol:joi.string().valid('user', 'company_HR').messages({message:'Role must beone of: user, company_HR'})
})
export const updatePassword=joi.object({
  email:joi.string().email().messages({message:'Email is required and must be a valid email address'}).required(),
  currentpassword:joi.string().required(),
  newpassword:joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).message('password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters ').required()
})
export const forgetpassSchema=joi.object({
  email:joi.string().email().messages({message:'Email is required and must be a valid email address'}).required()
})
export const confirmEmailSchema=joi.object({
  email:joi.string().email().messages({message:'Email is required and must be a valid email address'}).required(),
  code:joi.number().integer().min(4).max(4).required(),
  newpassword:joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).message('password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters ').required()
})


