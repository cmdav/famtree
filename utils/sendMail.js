const logger = require('./appLogger');
const { exec } = require('child_process');

module.exports.sendMail = async (email, subject, message) => {
    try {
        logger.info('Sending mail');

        // Validate if required parameters are present
        if (!subject || !email || !message) {
            logger.error('Missing required parameters');
            throw new Error('Missing required parameters');
        }

        const spawn = require('child_process').spawn;
        const process = spawn('python', ['./scripts/MailUtility.py', subject, email, message]);

        logger.info(`sending email to ${email} with subject ${subject} and message ${message}`);

        process.stdout.on('data', function (data) {
            logger.info(data.toString());
        });

        process.stderr.on('data', function (data) {
            logger.error(data.toString());
        });
    } catch (err) {
        logger.error(err);
    }
};

// module.exports = sendMail;
