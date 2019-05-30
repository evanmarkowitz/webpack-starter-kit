class bookings {
  constructor(bookingsData, rooms) {
    this.bookingsData = bookingsData;
    this.rooms = rooms;
  }
  getMostPopularDate() {
    // gets the date with the most amount of rooms booked
  }
  getLeastPopularDate() {
    // get the date with the least amount of rooms booked
  }
  getAvailableRoomsByDate() {
    // gets the amount of available rooms by date
  }
  getBookingsByCustomer() {
    // gets all the current and past bookings by date
  }
  filterByRoomType() {
    // filters all available room by type 
  }
  addAbooking() {
    // pushes a booking into the bookingsData
  }
}

export default bookings;