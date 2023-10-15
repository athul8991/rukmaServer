const { renderFile } = require('ejs');
const express = require('express');
const router = express.Router();
const Web = require('../Models/webModels');

router.get('/',async(req,res)=>{
    
    if(req.session.login){

       const [storydata] = await Web.find({_id:1});
       if(storydata){
        res.render('routes/story',{story:storydata.story})
       }else{
        res.render('routes/story',{story:null})
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
        let story={};
        story.title =title;
        story.content =body;
        Web.find({_id:1}).then((data)=>{
            if(data.length==0){
                Web.create({_id:1,story:{...story}}).then((data)=>{
                    res.send({message:"success"});
                })
            }else{
                Web.updateOne({_id:1},{story:{...story}}).then((data)=>{
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