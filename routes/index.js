var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("Home get");
  if(req.session.login ===true){

  res.render('AdminHome', { title: '' });
  }else{
  
    res.redirect('/login')
  }
});


module.exports = router;
