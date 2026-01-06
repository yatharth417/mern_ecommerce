const mongoose = require('mongoose');
const { describe } = require('node:test');

const productSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
        default:0,
    },
    brand:{
        type:String,
        required: true,
    },
    countInStock:{
        type:Number,
        required: true,
        default:0,
    },
},{
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);