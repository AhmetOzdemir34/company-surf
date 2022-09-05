const companyModel = require('../models/company-model');
const productModel = require('../models/product-model');

const result = async (req,res) => {
    try{
        let result = {last3: {}, productiveCompanies: {}, totalCompany: {}, totalProduct: {}, lastProducts: {}};
        result.productiveCompanies = await (await companyModel.find()).sort((a,b)=> b.products.length - a.products.length);
        result.totalCompany = await (await companyModel.find()).length;
        result.totalProduct = await (await productModel.find()).length;
        return res.json(result);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const searchCountry = async (req,res) => {
    try{
        const {incorporationCountry} = req.body;
        const companies = await companyModel.find({incorporationCountry});

        return res.json(companies);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const searchLegalNumber = async (req,res) => {
    try{
        const {legalNumber} = req.body;
        const company = await companyModel.findOne({legalNumber}).populate('products').exec();

        return res.json(company);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports = {
    result,
    searchCountry,
    searchLegalNumber
}

// search legal number
// search companies according to country