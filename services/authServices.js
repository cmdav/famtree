const logger = require('../utils/appLogger');
const Login = require('../models/Login');

async function findLoginByEmail(email){
    try {
        logger.info('findLoginByEmail() called');
        
        const login = await Login.findOne({email});
        return login;
    } catch (error) {
        logger.error(`Error in findLoginByEmail(): ${error}`);
    }
}

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
    findLoginById
}
