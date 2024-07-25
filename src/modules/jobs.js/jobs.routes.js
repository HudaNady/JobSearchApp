import express from 'express'
import * as job from './controllers/job.js'
import auth from '../../middleware/auth.js'
import upload from '../../middleware/multer.js'
import validation from '../../middleware/validation.js'
import applicationSchema from './applicationvalidation.js'
import { jobSchema, updatejobSchema } from './jobValidation.js'
const router=express.Router()
router.post('/addJob',auth,validation(jobSchema),job.addJob)
router.put('/update/:id',auth,validation(updatejobSchema),job.updateJob)
router.delete('/delete/:id',auth,job.deleteJob)
router.get('/allJobs',auth,job.getAllJobs)
router.get('/getAllJobForCompany',auth,job.getAllJobForCompany)
router.get('/getfilterJobs',auth,job.getfilterJobs)
router.post('/upplyJob',auth,upload().single('filePdf'),validation(applicationSchema),job.applyToJob)

export default router