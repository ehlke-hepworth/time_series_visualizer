const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000' 
}));

// Define the route to fetch data
app.get('/data', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8000/data/');
        console.log("Data received from FastAPI:", response.data);
        if (!response.data || !Array.isArray(response.data)) {
            console.error('Data is not an array or is undefined');
            res.status(500).json({ error: 'Data is not an array or is undefined' });
            return;
        }
        res.json(response.data);
    } catch (error) {
        console.error('Failed to fetch data from FastAPI:', error);
        res.status(500).send('Failed to fetch data');
    }
});

app.listen(8001, () => console.log('Server running on http://localhost:8001'));
