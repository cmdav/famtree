//Importing the express server
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

//connect to database
connectDB();

//Create a express variable
var myApp = express();

//Set up the body parser
myApp.use(express.json({ extended: false }));

//routes
myApp.use('/api/auth', require('./routes/api/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  myApp.use(express.static('client/build'));

  myApp.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//assigning the port
const PORT = process.env.PORT || 8081;
myApp.listen(PORT, () => console.log(`Server started on port ${PORT}`));
