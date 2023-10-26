// Login model with attributes like email and password.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoginSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Login', LoginSchema);
