const express = require('express');
const router = express.Router();
const Admin =require('../Models/adminModels');
const bcrypt =require('bcrypt')

router.get('/',(req,res)=>{
    if(req.session.login){
        res.redirect('/admin')
    }else{
    console.log("login get");
    res.render('login');
    }
});

router.post('/', async(req,res)=>{
    
    const {email,password} = req.body;
    const [user] = await Admin.find({email:email})
    if(user){
        const check = await bcrypt.compare(password,user.password);
        if(check){
            req.session.login =true;
            res.redirect('/admin')
        }
    }else{
        res.redirect('/login')
    }

})

module.exports =router