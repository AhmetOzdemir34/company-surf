const mongoose = require('mongoose');

const companyModel = mongoose.Schema({
    companyName: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    legalNumber: {
        type: mongoose.Schema.Types.Number,
        required:true,
        unique: true,
    },
    incorporationCountry: {
        type: mongoose.Schema.Types.String,
        required:true,
        trim: true
    },
    officeCount: {
        type: mongoose.Schema.Types.Number,
        required:true,
    },
    website: {
        type: mongoose.Schema.Types.String,
        required:true,
        trim: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    created_at: {
        type: mongoose.Schema.Types.Date,
        default: Date.now(),
    }
}, {
    toJSON: {virtuals:true}
});

companyModel.virtual('count').get(function(){
    return this.products.length;
})

module.exports = mongoose.model('Company', companyModel);