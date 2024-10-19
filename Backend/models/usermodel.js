const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        index: true,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema); // Corrected this line
module.exports = User;
