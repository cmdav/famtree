// Create mongodb model for below attributes:
// firstName, lastName, otherName, password, email, phone, street, city, state, postalCode, country, birthDate, profilePicPath

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    otherName: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: false
    },
    street: {
        type: String,
        required: true,
        unique: false
    },
    city: {
        type: String,
        required: true,
        unique: false
    },
    state: {
        type: String,
        required: true,
        unique: false
    },
    postalCode: {
        type: String,
        required: true,
        unique: false
    },
    country: {
        type: String,
        required: true,
        unique: false
    },
    birthDate: {
        type: String,
        required: true,
        unique: false
    },
    profilePicPath: {
        type: String,
        required: false,
        unique: false
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);