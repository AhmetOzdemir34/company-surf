const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

const premium = async(req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await userModel.findById(verified.key);
    if(!user.isPremium) return res.json({access: false, message:"You are not premium!"});
    req.key = verified.key;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unknown Error!" });
  }
}

module.exports = premium;

