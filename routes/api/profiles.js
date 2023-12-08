const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const logger = require('../../utils/appLogger');
const { findProfileByUserId, findProfileById } = require('../../services/profileServices');
const {validateProfileForm} = require('../../utils/formvalidation');
const {plotFamilyTree} = require('../../utils/plotFamilyTree');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        logger.info('GET api/profile called');
        const user = await findProfileByUserId(req.user.id);
        res.json(user);
    } catch (err) {
        logger.error(`Error in GET api/profile: ${err}`);
        res.status(500).send('Server error');
    }
});

// @route   GET api/profile/plotGraph
// @desc    Plot family tree
// @access  Public
router.get('/plotGraph', auth, async (req, res) => {
    try {
        logger.info('GET api/profile/plotGraph called');
        const user = await findProfileByUserId(req.user.id);
        
        // Plot the family tree
        plotFamilyTree(user.userId);
        res.json("Family tree plotted successfully");
    } catch (err) {
        logger.error(`Error in GET api/profile/plotGraph: ${err}`);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/profile
// @desc    Update profile
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        logger.info('PUT api/profile called');

        const profileId = req.params.id;
        const profile = await findProfileById(profileId);

        if (!profile) {
            return res.status(400).json({ errors: [{ msg: 'Profile does not exist' }] });
        }

        const errors = validateProfileForm(req.body, 'edit');

        if (Object.keys(errors).length > 0) {
            logger.error('Validation errors found ');

            // Print the validation errors to the console
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    logger.error(errors[key]);
                }
            }

            // convert the errors object to an json array and return it with status 400
            return res.status(400).json({ errors: Object.values(errors) });
        }

        const { firstName, lastName, middleName, gender, email, phone, street, city, state, postalCode, country, birthDate, profilePic } = req.body;
        profile.firstName = firstName;
        profile.lastName = lastName;
        profile.middleName = middleName;
        profile.gender = gender;
        profile.email = email;
        profile.phone = phone;
        profile.street = street;
        profile.city = city;
        profile.state = state;
        profile.postalCode = postalCode;
        profile.country = country;
        profile.birthDate = birthDate;
        profile.profilePic = profilePic;

        const savedProfile = await profile.save();
        res.status(200).json(savedProfile);
        
    } catch (err) {
        logger.error(`Error in PUT api/profile: ${err}`);
        res.status(500).send('Server error');
    }
});

module.exports = router;