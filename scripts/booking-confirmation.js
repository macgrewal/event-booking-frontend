console.log("booking-confirmation.js loaded");

const eventId = localStorage.getItem('eventId');
const employeeId = localStorage.getItem('employeeId');

const eventIdElement = document.createElement('p');
eventIdElement.textContent = `Event Id: ${eventId || ''}`;

const employeeIdElement = document.createElement('p');
employeeIdElement.textContent = `Booked by: ${employeeId || ''}`;

const button = document.querySelector('button');
button.parentNode.insertBefore(eventIdElement, button);
button.parentNode.insertBefore(employeeIdElement, button);
