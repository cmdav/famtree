// JS module to create unique IDs for each user usin uuidv4

const { v4: uuidv4 } = require('uuid');

const generateUniqueId = () => {
    return uuidv4();
    }

module.exports = generateUniqueId;