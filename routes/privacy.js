const express = require('express');
const router = express.Router();

const Web = require('../Models/webModels');

router.get('/',async(req,res)=>{
    
    if(req.session.login){

       const [privacydata] = await Web.find({_id:1});
       if(privacydata){
        res.render('routes/privacy',{privacy:privacydata.privacy})
       }else{
        res.render('routes/privacy',{privacy:null})
       }
        
    }else{
        res.send("login")
    }
});


router.post('/', async(req,res)=>{
    if(req.session.login){
    console.log(req.body);
    const {title,body} =req.body;
    if(title && body){
        let privacy={};
        privacy.title =title;
        privacy.content =body;
        console.log(privacy);
        Web.find({_id:1}).then((data)=>{
            if(data.length==0){
                Web.create({_id:1,privacy:{...privacy}}).then((data)=>{
                    res.send({message:"success"});
                })
            }else{
                Web.updateOne({_id:1},{privacy:{...privacy}}).then((data)=>{
                    res.send({message:"success"});         
                  }).catch((err)=>{
                    console.log(err);
                })

            }
        })
        
    }
}else{
    res.send('/login')
}
})

module.exports = router;