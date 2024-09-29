const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const serverRouter = express.Router(); // Use Router
serverRouter.use(cors());

require('dotenv').config();
const uri = process.env.mongouri;
const client = new MongoClient(uri);

// MongoDB Routes
serverRouter.get('/', (req, res) => {
  res.send('Welcome to the Case Management API');
});

serverRouter.get('/cases', async (req, res) => {
    try {
      await client.connect();
      console.log('Connected successfully to MongoDB');
      const database = client.db('FIR');
      const collection = database.collection('case');
  
      const cases = await collection.find({}).toArray();
      res.json(cases);
    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message || err);
      res.status(500).send('Error fetching cases from database');
    } finally {
      await client.close(); // Close the connection after the request
    }
  });
  

module.exports = serverRouter; // Export the router
