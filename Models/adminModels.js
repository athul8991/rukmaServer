require('../conn');
const mongoose =require('mongoose');

const adminSchema = new mongoose.Schema({
    email:String,
    password:String,
    valid:Boolean,
    otherData:{
        otp:String,
        expairy:String

    }
});

module.exports = new mongoose.model('Admin',adminSchema);