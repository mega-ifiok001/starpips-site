const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');




const PORT = process.env.PORT || 5000;


// middle ware 
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());


app.get('/', (req, res )=>{
    res.sendFile(path.join(__dirname, 'public',  'contact.html'))
})


app.post('/', (req, res)=>{
    console.log(req.body );
    res.send(('form received'))
    
})

const transporter = nodemailer.createTransport({
    post:'smtp,123-reg.co.uk',
    port:587,
    services: 'gmail',
    auth:{
        user: 'ziksfilmz92@gmail.com',
        pass:'Zikscreationz1992ziks'
    }
})


const mailOptions = {
    from:req.body.email,
    to:'ziksfilmz92@gmail.com',
    subject: `this Message is from ${fname}`,
    text: `this person's name is ${fname} <br> user phone number is ${phneNumber} <br> the main message is ${req.body.message}`
}
app.listen(PORT, ()=>{
    console.log(`server is currently running on ${PORT}`);
    
})