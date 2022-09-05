const mongoose = require('mongoose');
const companyModel = require('./company-model');

const productModel = mongoose.Schema({
    productName: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    productCategory: {
        type: mongoose.Schema.Types.String,
        required:true,
    },
    amount: { // ürün fiyatı 
        type: mongoose.Schema.Types.Number,
        required:true,
    },
    amountUnit: { // tutar birim ??? 
        type: mongoose.Schema.Types.Number,
        required:true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    created_at: {
        type: mongoose.Schema.Types.Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Product', productModel);