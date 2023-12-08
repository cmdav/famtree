// Create mongodb model for below attributes:
// firstName, lastName, middleName, password, email, phone, street, city, state, postalCode, country, birthDate, profilePicPath

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelationSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    relationshipType: {
        type: String,
        required: true,
    }
});

const ProfileSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
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
    middleName: {
        type: String,
        required: true,
        unique: false
    },
    gender: {
        type: String,
        required: true,
        unique: false
    },
    relations: {
        type: [RelationSchema],
        default: []
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