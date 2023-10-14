const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION_URL).then(()=>{
    console.log('Db connected');

}).catch((err)=>{
    console.log(err);
})