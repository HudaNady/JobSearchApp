import users from './modules/users/users.routes.js'
import companys from './modules/companys/companys.routes.js'
import jobs from './modules/jobs.js/jobs.routes.js'
import connected from '../DB/conection.js'
import globalError from './middleware/globalError.js'

function bootstrap(app,express){
    process.on('uncaughtException',(err)=>{
        console.log(err)
    })
    connected()
    app.use('/uploads',express.static('uploads'))
    app.use(express.json())
    app.use('/users',users)
    app.use('/companys',companys)
    app.use('/jobs',jobs)
    app.use('*',(req,res)=>{
        return res.json({message:'not found'})
    })
    process.on('unhandledRejection',(err)=>{
        console.log(err)
    })
    app.use(globalError)
}
export default bootstrap