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
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'ifiokaniebiet044@gmail.com',
            pass:'16062003Mega'
        }
    })

    const mailOptions ={
        from: req.body.email,
        to: 'ifiokaniebiet044@gmail.com',
        subject: `message from ${req.body.email} : ${req.body.message} : ${req.body.phneNumber}`,
        text: req.body-message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
            
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success')
            
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`server is currently running on ${PORT}`);
    
})