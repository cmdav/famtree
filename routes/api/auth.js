const express = require('express');
const router = express.Router();
const Login = require('../../models/Login');
const auth = require('../../middleware/auth');
const { validateProfileForm } = require('../../utils/formvalidation');
const { findProfileByEmail, saveProfile, findProfileByUserId, createProfile } = require('../../services/profileServices');
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
const {sendMail} = require('../../utils/sendMail');
const {createNeoRelationship} = require('../../utils/createNeoRelationship');

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

    const { password, email } = req.body;
    let ifProfileExists = true;
    let profile = await findProfileByEmail(email);

    // Check if the login exists
    const login = await findLoginByEmail(email);
    if (login) {
      return res.status(400).json({ errors: [{ msg: 'User login already exists' }] });
    }

    // Create a Register document if the user does not exist
    if(!profile){
      ifProfileExists = false;
      profile = createProfile(req.body);
    } 
    
    // Create a Login document
    let newLogin = new Login({
      userId: profile.userId,
      email,
      password
    });

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    newLogin.password = await bcrypt.hash(password, salt);

    newLogin = await newLogin.save();

    // check if the login document is saved successfully
    if (!newLogin) {
      logger.error('Error in saving the login document');
      return res.status(500).send('Server error');
    }

    // Save the Profile document
    profile = await saveProfile(profile);
    logger.info(`savedProfile userId: ${profile.userId}`);

    // Send email notification to the user
    const to_email = email;
    const subject = 'Registration successful';
    const message = `Your registration is successful.`;
    sendMail(to_email, subject, message);

    // Return jwt
    const payload = {
      user: {
        id: profile.userId
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: config.get('jwtExpire') }, // TODO: change to 3600 for production
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, profile, message: ifProfileExists ? 'Profile exists in the system. You can change the data using Edit Profile.' : 'User registered successfully'});
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

    const { firstName, lastName, middleName, gender, relationship, email, phone, street, city, state, postalCode, country, birthDate, profilePic } = req.body;

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
      gender,
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

    // Find the current user's profile
    const currentUserProfile = await findProfileByUserId(req.user.id);

    // Send email notification to the user
    const to_email = currentUserProfile.email;
    const subject = 'New member added';
    const message = `A new member ${firstName} ${lastName} has been added to your profile.`;
    sendMail(to_email, subject, message);

    // Create Neo4j Relationship
    createNeoRelationship();

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