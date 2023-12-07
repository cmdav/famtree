const logger = require('./appLogger');
const { exec } = require('child_process');

module.exports.createNeoRelationship = async () => {
    try {
        logger.info('Creating Neo4j Relationship');

        const spawn = require('child_process').spawn;
        const process = spawn('python', ['./scripts/pythonScriptMongo.py']);

        logger.info(`Creating Neo4j Relationship`);

        process.stdout.on('data', function (data) {
            logger.info(data.toString());
        });

        process.stderr.on('data', function (data) {
            logger.error(data.toString());
        });

        logger.info('Neo4j Relationship Created');
        
    } catch (err) {
        logger.error(err);
    }
}