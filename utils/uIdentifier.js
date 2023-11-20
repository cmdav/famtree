//This is a method to generate the unique ID
const { v4 } = require('uuid');
//import { v4 as uuidv4 } from 'uuid';

function generateUniqueId() {
  return v4();
}
const uniqueId = generateUniqueId();
console.log(uniqueId);
