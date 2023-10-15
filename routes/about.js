const express = require('express');
const router = express.Router();
const Web = require('../Models/webModels');

router.get('/',async(req,res)=>{
    
    if(req.session.login){

       const [aboutdata] = await Web.find({_id:1});
       if(aboutdata){
        res.render('routes/about',{about:aboutdata.about})
       }else{
        res.render('routes/about',{about:null})
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
        let about={};
        about.title =title;
        about.content =body;
        console.log(about);
        Web.find({_id:1}).then((data)=>{
            if(data.length==0){
                Web.create({_id:1,about:{...about}}).then((data)=>{
                    res.send({message:"success"});
                })
            }else{
                Web.updateOne({_id:1},{about:{...about}}).then((data)=>{
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