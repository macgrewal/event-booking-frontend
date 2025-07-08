import bookingService from "./bookingService";

let employeeId = 0;
let eventId = 0;

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

const loadEvents = () => {
    try {
        const data = {
            events: [
                {
                    id: 1,
                    name: "Xmas Party",
                    venue: "Central Park",
                    date: "2025-12-12",
                    capacity: 100
                }
            ]
        }
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
    } catch (err) {
        console.error("Failed to load events:", err);
    }
};

const handleBooking = async (e) => {
    e.preventDefault();

    employeeId = Number(document.querySelector('#employee-id')?.value.trim());
    eventId = Number(document.querySelector('input[name="eventId"]:checked')?.value);

    const bookingData = { employeeId, eventId };

    try {
        bookingService.addBooking(employeeId, eventId);
        console.log("Booking confirmed:");
        localStorage.setItem('employeeId', employeeId);
        localStorage.setItem('eventId', eventId);
        bookingForm.reset();
        window.location.href = 'booking-confirmation.html';
    } catch (err) {
        console.error("Booking failed:", err);
        const error = {
            information: err.message,
            employeeId: employeeId,
            eventId: eventId
        };
        localStorage.setItem('error', JSON.stringify(error));
        window.location.href = 'booking-error.html';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    bookingForm.addEventListener('submit', handleBooking);
});
