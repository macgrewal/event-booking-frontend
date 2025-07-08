let bookings = localStorage.getItem("bookings") ? JSON.parse(localStorage.getItem("bookings")) : [];

const addBooking = (employeeId, eventId) => {
  const booking = { employeeId, eventId };
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

const getBookings = (employeeId, eventId) => {
  return bookings.filter(booking => booking.employeeId === employeeId && booking.eventId === eventId);
}

const bookingService = {
  addBooking: (employeeId, eventId) => {
    if (!employeeId || !eventId) {
      throw new Error("Employee ID and Event ID are required for booking.");
    }
    if (getBookings(employeeId, eventId).length > 0) {
      throw new Error("Booking already exists for this employee and event.");
    }
    addBooking(employeeId, eventId);
  },

  getBookings: (employeeId, eventId) => {
    if (!employeeId || !eventId) {
      throw new Error("Employee ID and Event ID are required to retrieve bookings.");
    }
    return getBookings(employeeId, eventId);
  },

  clearBookings: () => {
    bookings = [];
    localStorage.removeItem("bookings");
  }
};

export default bookingService;