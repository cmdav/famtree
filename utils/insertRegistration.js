const { MongoClient } = require('mongodb');

// Connection URI
//const uri = 'mongodb+srv://applogin:wCl6QndJsayuLtOq@cluster0.ygx79sq.mongodb.net/'; 
//import { MongoClient } from 'mongodb';

// Database and collection 
const databaseName = 'FamTree'; 
const collectionName = 'Registration'; 

// Define the payload from the client
const payload = formData;

// Create a new MongoClient
const client = new MongoClient(mongoURI);

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB successfully');

  // Access the desired database and collection
  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  // Insert the payload into the collection
  collection.insertMany(payload, (err, result) => {
    if (err) {
      console.error('Failed to insert payload:', err);
    } else {
      console.log('Payload inserted successfully');
    }

    // Close the MongoDB connection
    client.close();
  });
});