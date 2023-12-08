const logger = require('../utils/appLogger');
const Profile = require('../models/Profile');
const generateUniqueId = require('../utils/generateUniqueId');

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

// Create a profile using the profile model and form data
function createProfile(profileData){
    try {
        logger.info('createProfile() called');

        const { firstName, lastName, middleName, gender, email, phone, street, city, state, postalCode, country, birthDate, profilePic } = profileData;

        // Generate unique userId using generateUniqueId util function
        const userId = generateUniqueId();

        // Create a Register document
        const profile = new Profile({
            userId,
            firstName,
            lastName,
            middleName,
            gender,
            email,
            phone,
            street,
            city,
            state,
            postalCode,
            country,
            birthDate,
            profilePic
        });
        
        return profile;
    } catch (error) {
        logger.error(`Error in createProfile(): ${error}`);
    }
}

module.exports = {
    findProfileByEmail,
    saveProfile,
    findProfileById,
    findProfileByUserId,
    createProfile
}