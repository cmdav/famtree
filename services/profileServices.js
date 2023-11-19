const logger = require('../utils/appLogger');
const Profile = require('../models/Profile');

async function findProfileByEmail(email){
    try {
        logger.info('findProfileByEmail() called');

        const profile = await Profile.findOne({email});
        return profile;
    } catch (error) {
        logger.error(`Error in findProfileByEmail(): ${error}`);
    }
}

async function saveProfile(profile){
    try {
        logger.info('saveProfile() called');

        const savedProfile = await profile.save();
        return savedProfile;
    } catch (error) {
        logger.error(`Error in saveProfile(): ${error}`);
    }
}

async function getProfileById(id){
    try {
        logger.info('getProfileById() called');

        const profile = await Profile.findById(id);
        return profile;
    } catch (error) {
        logger.error(`Error in getProfileById(): ${error}`);
    }
}

module.exports = {
    findProfileByEmail,
    saveProfile,
    getProfileById
}