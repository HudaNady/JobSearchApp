import mongoose from 'mongoose'

const connected=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/jobSearchApp').then(()=>{
        console.log('DB connected')
    }).catch((err)=>{
        console.log('DB failed')
        console.log(err)
    })
}

export default connected
