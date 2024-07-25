import nodemailer from 'nodemailer'
const sendEmail=async({from='"job app"<email>',to,subject="confirmEmail",html}={})=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        secure:false,
        auth:{
            user:"hudanady9@gmail.com",
            pass:"gfbmtuabrrohbfcd"
        }

    })
    const info =await transporter.sendMail({
        from,
        to,
        subject,
        html
    })
}
export default sendEmail