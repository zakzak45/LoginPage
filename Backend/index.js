const express = require('express')
const mongoose = require('mongoose')
const nodemailer =require('nodemailer')
const randomatic =require('randomatic')
const body_parser =require('body-parser')
const cors = require('cors')


require('dotenv').config()

app.use(body_parser.json())
app.use(cors())
const app =express()
const PORT = process.env.PORT || 4000














mongoose.connect('mongodb+srv://zayne:khunjuliwe@cluster0.01xvdjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('connected to a database')
}).catch((e)=>{
    console.log("not connected to a database"+e)
})

const User =mongoose.model('User',{
    email:String,
    password:String,
    otp:String
}

)

async function sendOtpEmail(email,otp) {
    try{
        const transpoter =nodemailer.createTransport({
            service:"gmail",
            auth:{
           user:"your name",
           pass:"your pass"
            },
        })

    const mailOPtions ={
        from:'your@gmail.com',
        to:email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`,
    }
    const info =
        await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

    }catch(error){
    console.log("error in sending the email"+error)
    
} 
}



app.listen(PORT,()=>{
    console.log("serve is running in port"+PORT)
})