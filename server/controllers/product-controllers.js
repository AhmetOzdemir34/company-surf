const companyModel = require("../models/company-model");
const productModel = require("../models/product-model");

const create = async (req,res) =>{
    try{
        const {productName, productCategory, amount, amountUnit, company} = req.body;
        const product = new productModel({
            productName,
            productCategory,
            amount,
            amountUnit,
            company
        });
        await product.save();
        const findedCompany = await companyModel.findById(company);
        findedCompany.products.push(product._id);
        await findedCompany.save();
        return res.json({product, message:"Ürün Oluşturuldu!"});
    }catch(err){
        return res.json({message:err.message});
    }
}

const searchByID = async (req,res) =>{
    try{
        const id = req.params.id;
        const product = await productModel.findById(id).populate('company');
        
        return res.json(product);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const getAll = async (req,res) =>{
    try{
        const result = await productModel.find();
        return res.json(result);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const update = async (req,res) =>{
    try{
        const id = req.params.id;
        const product = await productModel.findById(id);
        const {productName, productCategory, amount, amountUnit} = req.body;
        
        if(productName){
            product.productName = productName;
        }
        if(productCategory){
            product.productCategory = productCategory;
        }
        if(amount){
            product.amount = amount;
        }
        if(amountUnit){
            product.amountUnit = amountUnit;
        }        
        await product.save();
        return res.json({product, message:"Ürün değişiklikleri kaydedildi!"});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const deleteOne = async (req,res) =>{
    try{
        const id = req.params.id;
        const product = await productModel.findByIdAndDelete(id);

        const company = await companyModel.findById(product.company);
        company.products = company.products.filter((p)=> p != id);
        await company.save();
        return res.json({product, message:"Ürün silindi!"});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const nameASC = async (req,res)=>{
    try{
        let products = await (await productModel.find()).sort((a,b)=> a.productName.localeCompare(b.productName));

        return res.json(products);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const nameDESC = async (req,res)=>{
    try{
        let products = await (await productModel.find()).sort((a,b)=> b.productName.localeCompare(a.productName));

        return res.json(products);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const amountASC = async (req,res)=>{
    try{
        const products = await (await productModel.find()).sort((a,b)=> a.amount - b.amount);

        return res.json(products);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const amountDESC = async (req,res)=>{
    try{
        const products = await (await productModel.find()).sort((a,b)=> b.amount - a.amount);

        return res.json(products);
    }catch(err){
        
    }
}

const filterByCategory = async (req,res)=>{
    try{
        const {category} = req.body;
        const products = await productModel.find({productCategory:category});

        return res.json(products);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports = {
    create,
    getAll,
    searchByID,
    update,
    deleteOne,
    nameASC,
    nameDESC,
    amountASC,
    amountDESC,
    filterByCategory
}