const logger = require('../utils/appLogger');
const Login = require('../models/Login');

// Find a login by email
async function findLoginByEmail(email){
    try {
        logger.info('findLoginByEmail() called');
        
        const login = await Login.findOne({email});
        return login;
    } catch (error) {
        logger.error(`Error in findLoginByEmail(): ${error}`);
    }
}

// Find a login by userId
async function findLoginByUserId(userId){
    try {
        logger.info('findLoginByUserId() called');
        
        const login = await Login.findOne({userId});
        return login;
    } catch (error) {
        logger.error(`Error in findLoginByUserId(): ${error}`);
    }
}

// Find a login by id
async function findLoginById(id){
    try {
        logger.info('findLoginById() called');
        
        const login = await Login.findById(id).select('-password');
        return login;
    } catch (error) {
        logger.error(`Error in findLoginById(): ${error}`);
    }
}

module.exports = {
    findLoginByEmail,
    findLoginById,
    findLoginByUserId
}
