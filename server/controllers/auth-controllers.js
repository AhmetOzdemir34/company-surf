const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const signUp = async (req,res) => {
    try{
        const {username, email, password, confirmPassword} = req.body;
        if(password !== confirmPassword) return res.status(401).json({message:"Passwords are not matched!"});
        const bcryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            username,
            email,
            password:bcryptedPassword
        });
        await newUser.save();
        return res.status(201).json(newUser);
    }catch(err){
        return res.status(500).json({message:err.message});
    }   
}

const signIn = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await userModel.findOne({email});
        if(!user) return res.status(400).json({message:"User is not exist!"});
        
        const access = await bcrypt.compare(password, user.password);
        if(!access) return res.status(400).json({message:"Password is invalid!"});

        const token = jwt.sign({key: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
        return res.cookie('token',token, {
            httpOnly:true
        }).json(token);
    }catch(err){
        return res.status(500).json({message:err.message});
    }   
}

const signOut = async (req,res) => {
    try{
        return res.clearCookie('token').json('signed out!');
    }catch(err){
        return res.status(500).json({message:err.message});
    }   
}

const isSignedIn = async (req,res) => {
    try{
        const token = req.cookies.token;
        if(!token) return res.json({access:false, user:null, message:"Token is not found!"});

        const key = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(key.key);

        return res.json({user:user, access:true});
    }catch(err){
        return res.status(500).json({message:err.message, access:false, user:null});
    }   
}

const bePremium = async (req,res) => {
    try{
        const user = await userModel.findById(req.key);
        user.isPremium = true;
        await user.save();
        return res.json({message:"Premium üye deneyimine hoşgeldiniz!"});
    }catch(err){
        return res.json({message:err.message});
    }
}

const beNormal = async (req,res) => {
    try{
        const user = await userModel.findById(req.key);
        user.isPremium = false;
        await user.save();
        return res.json({message:"Normal üye özelliklerine dönüş yapıldı!"});
    }catch(err){
        return res.json({message:err.message});
    }
}

module.exports = {
    signUp,
    signIn,
    signOut,
    isSignedIn,
    bePremium,
    beNormal
}