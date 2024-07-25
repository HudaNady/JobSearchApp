
import express from 'express'
import * as company from './controllers/companys.js'
import auth from '../../middleware/auth.js'
import validation from '../../middleware/validation.js'
import { companySchema, updateCompanySchema } from './companyValidation.js'
const router=express.Router()
router.post('/addCompany',auth,validation(companySchema),company.addCompany)
router.put('/updateCompany/:id',auth,validation(updateCompanySchema),company.updateCompany)
router.get('/company/:id',auth,company.getCompany)
router.get('/search',auth,company.searchCompany)
router.delete('/delete/:id',auth,company.deleteCompany)
router.get('/jobs/:jobId/application',auth,company.allApplicationsForSpecificJob)
router.get('/ApplicationsforCompanyonSpecificDay',auth,company.ApplicationsforCompanyonSpecificDay)



export default router