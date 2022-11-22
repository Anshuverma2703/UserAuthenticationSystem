console.log('Express in the node js');

const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const User = require("./model/user");
const bcrypt = require('bcrypt');


const dbURL = "mongodb+srv://Anshu:Anshuverma2703@cluster1.falp91d.mongodb.net/test"
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));
const app = express();
const port  = 3000;  // default localhost : 


// app.use(express.urlencoded());
// app.use(express.urlencoded);// this is the middelware is used to get a data when user hit submit button and get in the express

app.use(bodyParser.json());// to decode the body which is comming in.

// app.use('/static' , express.static('Client'));  // for surving a static file
// app.use('/static'(url) , express.static('static')(folder name));


// app.use('/' , express.static(path.join(__dirname , 'ClientS')));


app.get('/' , (req , res)=>{
    
    // res.status(200).render('LoginPage.html');
    res.status(200).sendFile(path.join(__dirname+'/LoginPage.html'));
});

app.get('/newuser' , (req , res)=>{
    // res.status(200).render('LoginPage.html');
    res.status(200).sendFile(path.join(__dirname+'/RegistrationForm.html'));
});


// registration validation
app.post('/api/register' , async (req , res)=>{
    console.log(req.body);

    const {username , lastname,Email , phone , dob ,company , occupation, password:plaintext   } = req.body;
    // console.log(username)
    // console.log(password)
    if(!username || typeof username !== 'string'){
        return res.json({status : 'error' , data:'' , error:'Invalid username'})
    }
    if(!lastname || typeof lastname !== 'string'){
        return res.json({status : 'error' , data:'' , error:'Invalid lastname'})
    }
    if(!phone || typeof phone !== 'Number'){
        return res.json({status : 'error' , data:'' , error:'Invalid phone'})
    }
    if(!dob || typeof dob !== 'string'){
        return res.json({status : 'error' , data:'' , error:'Invalid phone'})
    }
    if(!Email || typeof Email !== 'string'){
        return res.json({status : 'error' , data:'' , error:'Invalid Email'})
    }
    if(!company || typeof company !== 'string'){
        return res.json({status : 'error' , data:'' , error:'Invalid company'})
    }
    if(!occupation || typeof occupation !== 'string'){
        return res.json({status : 'error' , data:'' , error:'Invalid occupation'})
    }
    if(!plaintext || typeof plaintext !== 'string'){
        return res.json({status : 'error' , error:'Invalid password'})
    }
    if(plaintext.length<5){
        return res.json({status : 'error' , error:'Password is too small.should be atleast 6 character'})

    }
    console.log(await bcrypt.hash(plaintext , 10));
    try{
        const response = await User.create({
            username,
            lastname,
            Email,
            phone,
            company,
            occupation,
            dob,
            password,
        })
        console.log('user create sucessfully:' , response)
        res.json({status:'ok'});
    }catch(error){
        if(error === 11000){
            return res.json({status:'error' , error: 'Username is already in datatbase'})
        }
        res.status(400).json({error});
        throw error
    }
    res.json({ status: 'ok' })
});



// START THE SERVER
app.listen(port , ()=>{
    console.log(`the application started sucessfully on portb ${port}`);
})