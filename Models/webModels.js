require('../conn');
const mongoose = require('mongoose');

const weSchema = new mongoose.Schema({
    _id:Number,
    about:{
        title:String,
        content:String
    },
   story:{
    title:String,
    content:String
    },
    privacy:{
        title:String,
        content:String
    }
});
module.exports = new mongoose.model('webContent',weSchema);