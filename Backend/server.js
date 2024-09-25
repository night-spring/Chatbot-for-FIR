const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());

const uri = "mongodb+srv://night:debojit80@fir.trwcj.mongodb.net/?retryWrites=true&w=majority&appName=FIR";
const client = new MongoClient(uri);
app.get('/', (req, res) => {
    res.send('Welcome to the Case Management API');
});

app.get('/cases', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('FIR');
        const collection = database.collection('case');

        const cases = await collection.find({}).toArray();
        res.json(cases);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching cases from database');
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});