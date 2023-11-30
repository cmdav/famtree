const logger = require('../utils/appLogger');
const Profile = require('../models/Profile');

// Find a profile by email
async function findProfileByEmail(email){
    try {
        logger.info('findProfileByEmail() called');

        const profile = await Profile.findOne({email});
        return profile;
    } catch (error) {
        logger.error(`Error in findProfileByEmail(): ${error}`);
    }
}

// Find a profile by userId
async function findProfileByUserId(userId){
    try {
        logger.info('findProfileByUserId() called');

        const profile = await Profile.findOne({userId});
        return profile;
    } catch (error) {
        logger.error(`Error in findProfileByUserId(): ${error}`);
    }
}

// Save a profile
async function saveProfile(profile){
    try {
        logger.info('saveProfile() called');

        const savedProfile = await profile.save();
        return savedProfile;
    } catch (error) {
        logger.error(`Error in saveProfile(): ${error}`);
    }
}

// Get a profile by id
async function findProfileById(id){
    try {
        logger.info('findProfileById() called');

        const profile = await Profile.findById(id);
        return profile;
    } catch (error) {
        logger.error(`Error in findProfileById(): ${error}`);
    }
}

module.exports = {
    findProfileByEmail,
    saveProfile,
    findProfileById,
    findProfileByUserId
}