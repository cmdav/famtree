const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const logger = require('../../utils/appLogger');
const { findProfileByEmail, getProfileById } = require('../../services/profileServices');
const { findLoginById } = require('../../services/authServices');
const {validateProfileForm} = require('../../utils/formvalidation');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        logger.info('GET api/profile called');
        const login = await findLoginById(req.user.id);
        const user = await findProfileByEmail(login.email);
        res.json(user);
    } catch (err) {
        logger.error(`Error in GET api/profile: ${err}`);
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
        const profile = await getProfileById(profileId);

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



        const { firstName, lastName, otherName, email, phone, street, city, state, postalCode, country, birthDate, profilePic } = req.body;
        profile.firstName = firstName;
        profile.lastName = lastName;
        profile.otherName = otherName;
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