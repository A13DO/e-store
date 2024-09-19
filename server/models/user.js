const mongoose = require("mongoose")
const validator = require('validator');
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide password'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {collection: "users"})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch
}
const jwt = require('jsonwebtoken'); // Ensure you have the jsonwebtoken library installed

UserSchema.methods.CreateJWTToken = function () {
    // Default to '5m' if process.env.JWT_LIFETIME is not set
    const expiresIn = process.env.JWT_LIFETIME || '5m';
    
    // Calculate expiration date in milliseconds
    const expirationDate = ms(expiresIn);
    
    const token = jwt.sign(
        { userID: this._id, userEmail: this.email },
        process.env.JWT_SECRET,
        { expiresIn } // Use duration string directly for jwt.sign
    );

    return { token, expirationDate };
};

// Helper function to convert duration strings to milliseconds
const ms = (duration) => {
    const match = duration.match(/(\d+)([mhdw])/);
    if (!match) return 0;

    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case 'm': return value * 60 * 1000;
        case 'h': return value * 60 * 60 * 1000;
        case 'd': return value * 24 * 60 * 60 * 1000;
        case 'w': return value * 7 * 24 * 60 * 60 * 1000;
        default: return 0;
    }
}

module.exports = mongoose.model('User', UserSchema);
