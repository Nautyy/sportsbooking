const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const centerRoutes = require('./routes/centerRoutes'); // Ensure this path is correct
const bookingRoutes = require('./routes/bookingRoutes'); // Import the booking routes

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/centers', centerRoutes);
app.use('/api/bookings', bookingRoutes); // Use the booking routes

// Use other routes here as needed...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
