require('../conn');
const mongoose =require('mongoose');

const prodectSchema = new mongoose.Schema({
    name:String,
    usage:String,
    description:String,
    details:[
        {
            price:Number,
            quantity:String,
            nos:Number

        }
    ]

});

module.exports =new mongoose.model('product',prodectSchema);