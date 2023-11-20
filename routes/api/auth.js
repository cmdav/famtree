const express = require('express');
const router = express.Router();
const Login =  require('../../models/Login');
const registrationModel =  require('../../models/Registration');
const auth = require('../../middleware/auth');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
      const user = await Login.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

router.post('/signup', async (req, res) => {
  const payload = req.body
  console.log(payload)
    try {
      const registration = await registrationModel.create(payload);
      res.json(registration);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
module.exports = router;