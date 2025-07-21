const express = require('express')
const mongoose = require('mongoose')
const nodemailer =require('nodemailer')
const randomatic =require('randomatic')
const body_parser =require('body-parser')
const cors = require('cors')
const app =express()

require('dotenv').config()

app.use(body_parser.json())
app.use(cors())

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

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    try {
        const user = await User.findOne({ email, password });
        console.log(user)
        if (!user) {
            return res.json(
                {
                    success: false,
                    message: 'Invalid credentials'
                }
            );
        }

        const generatedOtp = randomize('0', 6);
        user.otp = generatedOtp;
        await user.save();

        sendOtpEmail(email, generatedOtp);

        return res.json({ success: true });
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json(
            {
                success: false,
                message: 'An error occurred during login'
            }
        );
    }
});

app.post('/auth/verify-otp', async (req, res) => {
    const { otp } = req.body;

    try {
        const user = await User.findOne({ otp });

        if (!user) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        user.otp = '';
        await user.save();

        return res.json({ success: true });
    } catch (error) {
        console.error('Error during OTP verification:', error.message);
        return res.status(500)
            .json(
                {
                    success: false,
                    message: 'An error occurred during OTP verification'
                }
            );
    }
});


app.listen(PORT,()=>{
    console.log("serve is running in port"+PORT)
})