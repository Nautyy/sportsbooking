// routes/bookingRoutes.js
const express = require('express');
const Booking = require('./models/Booking');
const router = express.Router();

// Create a new booking
router.post('/bookings', async (req, res) => {
    try {
        const { customerName, center, sport, date, timeSlot } = req.body;

        // Check for existing bookings
        const existingBooking = await Booking.findOne({
            center,
            sport,
            date,
            timeSlot
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'Time slot is already booked.' });
        }

        const newBooking = new Booking({ customerName, center, sport, date, timeSlot });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Additional routes for updating and deleting can be added similarly.

module.exports = router;
