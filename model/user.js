const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }

}, {
    timestamps: true
});


const User = mongoose.model('Users', userSchema);
module.exports = User;


