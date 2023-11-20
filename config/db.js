const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const logger = require('../utils/appLogger');

const connectDB = async () => {
  console.log(db)
  try{
    mongoose.set('strictQuery', false);
    await mongoose.connect(db);
    logger.info('logger : MongoDB Connected...');
  } catch(err){
    logger.error(`MongoDB Connection Error: ${err.message}`);
    // exit process with failure
    process.exit(1);
  }
}
module.exports = connectDB;