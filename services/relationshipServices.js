const logger = require('../utils/appLogger');
const { findProfileByUserId } = require('./profileServices');

async function isRelationshipExist(userId, email) {
    try {
        var isRelationshipExist = false;
        logger.info('isRelationshipExist() called');

        // Fetch all relationships from profile collection of userId
        const profile = await findProfileByUserId(userId);
        const relationships = profile.relations;

        // Loop through the relationships array and find profile with userId present in relationships array
        for (let i = 0; i < relationships.length; i++) {
            const relationship = relationships[i];

            // Find profile with userId present in relationships array
            const profile = await findProfileByUserId(relationship.userId);

            // If profile is found, check if email matches
            if (profile) {
                if (profile.email === email) {
                    isRelationshipExist = true;
                    break;
                }
            }
        }
    } catch (error) {
        logger.error(`Error in isRelationshipExist(): ${error}`);
    }
    return isRelationshipExist;
}

module.exports = {
    isRelationshipExist
};