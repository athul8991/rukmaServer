const express = require('express');
// const { render } = require('../app');

const router = express.Router();

router.get('/',(req,res)=>{
    if(req.session.login){
    res.render('routes/dataShow');
    }else{
        res.redirect('/login');
    }
});

module.exports=router;