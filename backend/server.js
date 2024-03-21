const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Routes
app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

app.use('/api', require('./routes/crud'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
