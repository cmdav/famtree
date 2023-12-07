const logger = require('./appLogger');
const { exec } = require('child_process');

module.exports.plotFamilyTree = async (userId) => {
    try {
        logger.info('Plotting family tree');

        // Validate if required parameters are present
        if (!userId) {
            logger.error('Missing required parameters');
            throw new Error('Missing required parameters');
        }

        const spawn = require('child_process').spawn;
        const process = spawn('python', ['./scripts/Plot_Family_Tree.py', userId]);

        logger.info(`Plotting family tree for ${userId}`);

        process.stdout.on('data', function (data) {
            logger.info(data.toString());
        });

        process.stderr.on('data', function (data) {
            logger.error(data.toString());
        });
    } catch (err) {
        logger.error(err);
    }
}