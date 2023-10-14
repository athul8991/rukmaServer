const Admin = require('../Models/adminModels');
const indexRouter = require('./index')
const express = require('express');
const app = express()
const bcrypt = require('bcrypt');
// const { render } = require('../app');

const router = express.Router();



router.get('/',(req,res)=>{
    console.log('hai');
    res.render('register');
});

router.post('/',(req,res,next)=>{ 
    const {email,password} = req.body;
    console.log(req.body);
    if(email && password){
        Admin.find({email :email}).then((data)=>{
            if(data.length>0){
                res.send({msg:'Username not available',status:403});
            }else{
                bcrypt.hash(password,10).then((hashedPass)=>{
                    Admin.create({email:email,password:hashedPass}).then((data)=>{
                        req.session.login =true;
                        res.redirect('/admin')
                    }).catch((err)=>{
                        console.log(err);
                    })

                })
                
            }
           
            
        }).catch((err)=>{
            console.log(err);
        })

     }else{
    res.send({msg:'Enter a valid email',status:422});
}

});

module.exports  =router;
