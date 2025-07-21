const express =require("express")
const { message } = require("statuses")

const PORT =process.env.PORT  || 4000
require('dotenv').config()
const app = express()

app.use(express.json())





app.get('/',(req,res)=>{
    res.json({
        message:"this is the data"
    })
})





app.listen(PORT,()=>{
    console.log("serve is running in port "+PORT)
})

