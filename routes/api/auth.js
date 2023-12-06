const express = require('express');
const { exec } = require('child_process');
const router = express.Router();
const fs = require('fs').promises;
const Login =  require('../../models/Login');
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

router.get('/registration_complete', express.json(), async (req, res) => {
    try {
      console.log("registration complete called");
      // Read parameters from the JSON file
      const jsonContent = await fs.readFile('../famtree/routes/api/input.json', 'utf-8');
      // const params = JSON.parse(jsonContent);
  
      // Extract parameters from the JSON
      // const subject = parseFloat(params.new.subject);
      // const email = parseFloat(params.new.email);
      // const body = parseFloat(params.new.body);
      
      
      subject = "value"
      email = "aloysius397@gmail.com"
      body = "value"

      // Validate if required parameters are present
      if (!subject || !email || !body) {
        return res.status(400).send('Bad Request: Missing or invalid parameters');
      }
      
      // Construct the command to execute the Python script with parameters
      const command = `python utils/app.py ${subject} ${email} ${body}`;
  
      // Execute the Python script as a child process using the 'exec' function
      exec(command, (error, stdout, stderr) => {
        // Check if there was an error while executing the Python script
        if (error) {
          // Log the error message to the console
          console.error(`Error: ${error.message}`);
  
          // Send a 500 Internal Server Error response to the client
          return res.status(500).send('Internal Server Error');
        }
  
        // Log the output of the Python script to the console
        console.log(`Notification sent`);
  
        // Send the output of the Python script as the response to the client
        res.send(stdout);
      });
    } catch (error) {
      console.error(`Error reading JSON file: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;