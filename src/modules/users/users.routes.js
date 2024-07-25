import express from 'express'
import * as user from './controllers/users.js'
import {  confirmEmailSchema, forgetpassSchema, loginSchema, signUpSchema, updatePassword, updateUserSchema } from './userValidation.js'
import validation from '../../middleware/validation.js'
import auth from '../../middleware/auth.js'

const router=express.Router()
router.post('/signUp',validation(signUpSchema),user.signUp)
router.post('/signIn',validation(loginSchema),user.login)
router.put('/update',auth,validation(updateUserSchema),user.updateUser)
router.delete('/delete',auth,user.deleteUser)
router.get('/user',auth,user.getUserData)
router.get('/user/:id',user.getAnthorUser)
router.get('/:email',user.getAllAccounts)
router.patch('/updatePassword',auth,validation(updatePassword),user.updatePassword)
router.patch('/forgetpass',validation(forgetpassSchema),user.forgetpass)
router.patch('/confirmEmail',validation(confirmEmailSchema),user.confirmEmail)

export default router