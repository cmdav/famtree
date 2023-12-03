const express = require('express');
const router = express.Router();
const Login = require('../../models/Login');
const auth = require('../../middleware/auth');
const { validateProfileForm } = require('../../utils/formvalidation');
const { findProfileByEmail, saveProfile, findProfileByUserId } = require('../../services/profileServices');
const Profile = require('../../models/Profile');
const logger = require('../../utils/appLogger');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {findLoginByEmail} = require('../../services/authServices');
const {check, validationResult} = require('express-validator');
const generateUniqueId = require('../../utils/generateUniqueId');
const {findLoginByUserId} = require('../../services/authServices');
const {isRelationshipExist} = require('../../services/relationshipServices');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    logger.info(`GET api/auth called. user: ${user}`);
    const user = await findLoginByUserId(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    logger.info('POST api/auth/register called');
    const errors = validateProfileForm(req.body, 'create');

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

    const { firstName, lastName, middleName, password, confirmPassword, email, phone, street, city, state, postalCode, country, birthDate, profilePic } = req.body;
    const profile = await findProfileByEmail(email);
    if (profile) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const login = await findLoginByEmail(email);
    if (login) {
      return res.status(400).json({ errors: [{ msg: 'User login already exists' }] });
    }

    // Generate unique userId using generateUniqueId util function
    const userId = generateUniqueId();

    // Create a Register document
    const newProfile = new Profile({
      userId,
      firstName,
      lastName,
      middleName,
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

    const newLogin = new Login({
      userId,
      email,
      password
    });

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    newLogin.password = await bcrypt.hash(password, salt);

    const savedLogin = await newLogin.save();

    // check if the login document is saved successfully
    if (!savedLogin) {
      logger.error('Error in saving the login document');
      return res.status(500).send('Server error');
    }

    // Save the Profile document
    const savedProfile = await saveProfile(newProfile);
    logger.info(`savedProfile userId: ${savedProfile.userId}`);

    // Return jwt
    const payload = {
      user: {
        id: savedLogin.userId
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: config.get('jwtExpire') }, // TODO: change to 3600 for production
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, savedProfile });
      }
    );

  } catch (error) {
    logger.error(`Error in POST api/auth: ${error}`);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/addmember
// @desc    Add member
// @access  Private
router.post('/addmember', auth, async (req, res) => {
  try {
    logger.info('POST api/auth/addmember called');
    const errors = validateProfileForm(req.body, 'add');

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

    const { firstName, lastName, middleName, relationship, email, phone, street, city, state, postalCode, country, birthDate, profilePic } = req.body;

    const isRelationshipFound = await isRelationshipExist(req.user.id, email);
    if (isRelationshipFound) {
      return res.status(400).json({ errors: [{ msg: 'Relationship already exists' }] });
    }

    // Generate unique userId using generateUniqueId util function
    const userId = generateUniqueId();

    // Create a Register document
    const newProfile = new Profile({
      userId,
      firstName,
      lastName,
      middleName,
      relationship,
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

    // Save the Profile document
    const savedProfile = await saveProfile(newProfile);
    logger.info(`savedProfile userId: ${savedProfile.userId}`);

    // Create Relationship document
    const relationshipProfile = {
      userId: savedProfile.userId,
      relationshipType: relationship
    };

    // Add the relationshipProfile to the profile document of the user
    const profile = await findProfileByUserId(req.user.id);
    profile.relations.push(relationshipProfile);
    await saveProfile(profile);

    res.status(200).json({ message: "Member Added" });

  } catch (error) {
    logger.error(`Error in POST api/auth/addmember: ${error}`);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    logger.info('POST api/auth called');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('Validation errors found ');
      logger.error(JSON.stringify(errors));
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // see if user exists
      let user = await findLoginByEmail(email);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // compare the user input password with the encrypted password in db
      const isMatch = await bcrypt.compare(password, user.password);
      logger.info(`isMatch: ${isMatch}`);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.userId,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;