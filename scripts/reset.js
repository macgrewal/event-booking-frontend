import bookingService from "./bookingService";

document.addEventListener('DOMContentLoaded', () => {
  bookingService.clearBookings();

  console.log("All bookings have been reset.");
  window.location.href = 'index.html';
});