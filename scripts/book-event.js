import axios from 'axios';

const API_CONFIG = {
    BASE_URL: "http://<replace this server prefix>.eu-west-2.compute.amazonaws.com:<replace port number>",
    AUTH: { username: "<username>", password: "<password>" },
    HEADERS: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
};

let employeeId = 0;
let eventId = 0;

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    auth: API_CONFIG.AUTH,
    headers: API_CONFIG.HEADERS,
});

const eventsContainer = document.getElementById('events');
const bookingForm = document.getElementById('bookingForm');
const employeeIdInput = document.getElementById('employee-id');

const createEventElement = (event) => {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event';
    eventDiv.innerHTML = `
        <strong>${event.name}</strong>
        <p>Location: ${event.venue}</p>
        <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
        <p>Capacity: ${event.capacity}</p>
        <label>
            <input type="radio" name="eventId" value="${event.id}" required>
            Select this event
        </label>
    `;
    return eventDiv;
};

const loadEvents = async () => {
    try {
        const { data } = await api.get('/events');
        eventsContainer.innerHTML = ''; // Clear previous events
        if (!data || !data.events || data.events.length === 0) {
            eventsContainer.innerHTML = '<p>No events available at the moment.</p>';
            return;
        }

        data.events.forEach(event => {
            const element = createEventElement(event);
            eventsContainer.appendChild(element);
        });

        document.getElementById('bookEvent').disabled = false;
        document.querySelectorAll('input[name="eventId"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                eventId = Number(e.target.value);
            });
        });


    } catch (err) {
        console.error("Failed to load events:", err);
    }
};

const handleBooking = async (e) => {
    e.preventDefault();

    const bookingData = { employeeId, eventId };

    try {
        const { data } = await api.post('/booking', bookingData);
        console.log("Booking confirmed:", data);
        localStorage.setItem('employeeId', employeeId);
        localStorage.setItem('eventId', eventId);
        bookingForm.reset();
        window.location.href = 'booking-confirmation.html';
    } catch (err) {
        console.error("Booking failed:", err);
        localStorage.setItem('error', JSON.stringify(err.response.data));
        window.location.href = 'booking-error.html';
    }
};

employeeIdInput.addEventListener('input', (e) => {
    employeeId = Number(e.target.value.trim());
});

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    bookingForm.addEventListener('submit', handleBooking);
});
