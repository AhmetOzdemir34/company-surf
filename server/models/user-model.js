const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        lowercase:true,
        trim: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required:true,
        unique: true,
        trim: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required:true,
    },
    isPremium: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    created_at: {
        type: mongoose.Schema.Types.Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('User', userModel)