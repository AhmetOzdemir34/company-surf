const companyModel = require("../models/company-model");
const productModel = require("../models/product-model");

const createCompany = async (req,res) =>{
    try{
        const {companyName, legalNumber, incorporationCountry, website, officeCount} = req.body;
        const company = new companyModel({
            companyName,
            legalNumber,
            incorporationCountry,
            website,
            officeCount
        });
        await company.save();
        return res.json({company, message:"Şirket Oluşturuldu!"});
    }catch(err){
        return res.json({message:err.message});
    }
}

const searchName = async (req,res) =>{
    try{
        const {companyName} = req.body;
        const company = await companyModel.findOne({companyName});
        if(!company) return res.json({message:'Legal Number is invalid!'});
        
        return res.json(company);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const update = async (req,res) =>{
    try{
        const id = req.params.id;
        const company = await companyModel.findById(id);
        const {companyName, website, incorporationCountry} = req.body;
        console.log(companyName, website, incorporationCountry);
        
        if(companyName){
            company.companyName = companyName;
        }
        if(website){
            company.website = website;
        }
        if(incorporationCountry){
            company.incorporationCountry = incorporationCountry;
        }
        await company.save();
        return res.json({company, message:"Değişiklikler kaydedildi."});

    }catch(err){
        return res.json({message:err.message});
    }
}

const deleteOne = async (req,res) =>{
    try{
        const key = req.params.key;
        const user = await companyModel.findByIdAndDelete(key);
        if(!user) return res.json({message:"ID bilgisi geçersiz!"});
        await productModel.deleteMany({company:key});

        return res.json({message:"Silme İşlemi Başarılı!"});
    }catch(err){
        return res.json({message:err.message});
    }
}

const nameASC = async (req,res) => {
    try{
        const companies = await (await companyModel.find()).sort((a,b)=> a.companyName.localeCompare(b.companyName));

        return res.json(companies);
    }catch(err){
        return res.json({message:err.message});
    }
}

const nameDESC = async (req,res) => {
    try{
        const companies = await (await companyModel.find()).sort((a,b)=> b.companyName.localeCompare(a.companyName));

        return res.json(companies);
    }catch(err){
        return res.json({message:err.message});
    }
}

const officeCountASC = async (req,res) => {
    try{
        let companies = await companyModel.find();

        companies = companies.sort((a,b)=> a.officeCount-b.officeCount);

        return res.json(companies);
    }catch(err){
        return res.json({message:err.message});
    }
}

const officeCountDESC = async (req,res) => {
    try{
        let companies = await companyModel.find();

        companies = companies.sort((a,b)=> b.officeCount-a.officeCount);

        return res.json(companies);
    }catch(err){
        return res.json({message:err.message});
    }
}

module.exports = {
    createCompany,
    searchName,
    update,
    deleteOne,
    nameASC,
    nameDESC,
    officeCountASC,
    officeCountDESC,
}