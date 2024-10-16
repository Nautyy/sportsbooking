const centerSelect = document.getElementById('centerSelect');
const sportSelect = document.getElementById('sportSelect');
const dateInput = document.getElementById('dateInput');
const bookingList = document.getElementById('bookingList');
const createBookingForm = document.getElementById('createBookingForm');
const customerNameInput = document.getElementById('customerName');
const timeInput = document.getElementById('timeInput');

async function fetchCenters() {
    const response = await fetch('http://localhost:5000/api/centers');
    const centers = await response.json();
    centers.forEach(center => {
        const option = document.createElement('option');
        option.value = center._id;
        option.textContent = center.name;
        centerSelect.appendChild(option);
    });
}

async function fetchSports(centerId) {
    const response = await fetch(`http://localhost:5000/api/sports/${centerId}`);
    const sports = await response.json();
    sportSelect.innerHTML = ''; // Clear existing options
    sports.forEach(sport => {
        const option = document.createElement('option');
        option.value = sport._id;
        option.textContent = sport.name;
        sportSelect.appendChild(option);
    });
}

async function viewBookings() {
    const centerId = centerSelect.value;
    const sportId = sportSelect.value;
    const date = dateInput.value;
    
    const response = await fetch(`http://localhost:5000/api/bookings/${centerId}/${sportId}/${date}`);
    const bookings = await response.json();
    
    bookingList.innerHTML = ''; // Clear existing bookings
    bookings.forEach(booking => {
        const div = document.createElement('div');
        div.className = 'booking-item';
        div.textContent = `Customer: ${booking.customerName}, Time: ${booking.startTime}`;
        bookingList.appendChild(div);
    });
}

async function createBooking() {
    createBookingForm.style.display = 'block';
}

async function submitBooking() {
    const centerId = centerSelect.value;
    const sportId = sportSelect.value;
    const date = dateInput.value;
    const customerName = customerNameInput.value;
    const startTime = timeInput.value;
    
    const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ court: sportId, date, startTime, customerName }),
    });

    if (response.ok) {
        alert('Booking created successfully!');
        viewBookings(); // Refresh bookings
        createBookingForm.style.display = 'none'; // Hide form
        customerNameInput.value = '';
        timeInput.value = '';
    } else {
        const error = await response.json();
        alert(error.error);
    }
}

centerSelect.addEventListener('change', () => fetchSports(centerSelect.value));
document.getElementById('viewBookings').addEventListener('click', viewBookings);
document.getElementById('createBooking').addEventListener('click', createBooking);
document.getElementById('submitBooking').addEventListener('click', submitBooking);

// Initialize the app
fetchCenters();

document.addEventListener('DOMContentLoaded', () => {
    const centers = [
        { id: 1, name: 'Mumbai Sports Complex' },
        { id: 2, name: 'Delhi Sports Arena' },
        { id: 3, name: 'Bangalore Sports Hub' },
        { id: 4, name: 'Chennai Athletic Center' },
        { id: 5, name: 'Kolkata Sportzone' },
        { id: 6, name: 'Hyderabad Sports City' },
        { id: 7, name: 'Pune Sports Academy' },
        { id: 8, name: 'Ahmedabad Sports Center' },
        { id: 9, name: 'Jaipur Sport City' },
        { id: 10, name: 'Goa Sports Village' }
    ];

    const sports = ['Cricket', 'Football', 'Badminton', 'Tennis', 'Basketball', 'Swimming'];

    const centerSelect = document.getElementById('centerSelect');
    const sportSelect = document.getElementById('sportSelect');
    const dateInput = document.getElementById('dateInput');
    const viewBookingsButton = document.getElementById('viewBookings');
    const createBookingButton = document.getElementById('createBooking');
    const createBookingForm = document.getElementById('createBookingForm');
    const submitBookingButton = document.getElementById('submitBooking');

    // Populate Centers
    centers.forEach(center => {
        const option = document.createElement('option');
        option.value = center.id;
        option.textContent = center.name;
        centerSelect.appendChild(option);
    });

    // Populate Sports
    sports.forEach(sport => {
        const option = document.createElement('option');
        option.value = sport;
        option.textContent = sport;
        sportSelect.appendChild(option);
    });

    // View Bookings
    viewBookingsButton.addEventListener('click', async () => {
        const centerId = centerSelect.value;
        const sport = sportSelect.value;
        const date = dateInput.value;

        if (!centerId || !sport || !date) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            const response = await fetch(`/api/bookings/${centerId}/${sport}/${date}`);
            const bookings = await response.json();
            displayBookings(bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    });

    // Show Create Booking Form
    createBookingButton.addEventListener('click', () => {
        createBookingForm.style.display = 'block';
    });

    // Submit Booking
    submitBookingButton.addEventListener('click', async () => {
        const customerName = document.getElementById('customerName').value;
        const time = document.getElementById('timeInput').value;
        const courtId = centerSelect.value;  // Assuming court based on center
        const date = dateInput.value;
    
        if (!customerName || !time || !courtId || !date) {
            alert('Please fill out all fields.');
            return;
        }
    
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    court: courtId,
                    date,
                    startTime: time,
                    customerName
                })
            });
    
            const result = await response.json();
            if (result.error) {
                // Display error if booking conflict
                alert(result.error);
            } else {
                alert('Booking created successfully!');
                createBookingForm.style.display = 'none';
            }
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    });
    

    // Function to display bookings
    function displayBookings(bookings) {
        const bookingList = document.getElementById('bookingList');
        bookingList.innerHTML = '';

        if (bookings.length === 0) {
            bookingList.innerHTML = '<p>No bookings available.</p>';
        } else {
            bookings.forEach(booking => {
                const div = document.createElement('div');
                div.textContent = `Customer: ${booking.customerName}, Time: ${booking.startTime}`;
                bookingList.appendChild(div);
            });
        }
    }
});
