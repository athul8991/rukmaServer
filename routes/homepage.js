const express =require('express');
const router =express.Router();
const Web = require('../Models/webModels');
router.get('/',async(req,res)=>{
    let about,story,privacy;
    await Web.find({_id:1}).then(([findData])=>{
        
        if(findData){
            about = findData.about;
            story = findData.story;
            privacy =findData.privacy;

            console.log(about);
        // res.render('homePage',{about:about})
        }else{
            about =null;
        }
    })
    res.render('homePage',{about:about,story:story,privacy:privacy})

})

module.exports =router;