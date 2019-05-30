class Bookings {
  constructor(bookingsData, rooms) {
    this.bookingsData = bookingsData;
    this.rooms = rooms;
  }
  populateBookingsByDates() {
    let bookingsByDate = this.bookingsData.reduce((acc, booking) => {
      acc[booking.date] = (acc[booking.date] || 0) + 1;
      return acc;
    }, {});
    return bookingsByDate
  }
  getMostPopularDate() {
    let condenseBooking = this.populateBookingsByDates()
    return Object.keys(condenseBooking).reduce((acc, curDate) => {
      let sAccDate = acc.split('/').reverse().join()
      let sCurDate = curDate.split('/').reverse().join()
      condenseBooking[acc] > condenseBooking[curDate] ? acc : acc = curDate
      return condenseBooking[acc] === condenseBooking[curDate] && sCurDate < sAccDate ? acc = curDate : acc 
    }, Object.keys(condenseBooking)[0]);
  }
  getLeastPopularDate() {
    let condenseBooking = this.populateBookingsByDates()
    return Object.keys(condenseBooking).reduce((acc, curDate) => {
      let sAccDate = acc.split('/').reverse().join()
      let sCurDate = curDate.split('/').reverse().join()
      condenseBooking[acc] <= condenseBooking[curDate] ? acc : acc = curDate
      condenseBooking[acc] === condenseBooking[curDate] && sAccDate < sCurDate ? acc : acc = curDate
      return acc
    }, Object.keys(condenseBooking)[0]);
  }
  getAvailableRoomsByDate(date) {
    let todaysBooking = this.bookingsData.filter(booking => booking.date === date)
    let todaysBookingNums = todaysBooking.map(booking => booking.roomNumber)
    let availableRooms = this.rooms.reduce((acc, room) => {
      todaysBookingNums.length === 0 ? todaysBookingNums = [0] : null
      todaysBookingNums.map((num) => {
        room.number === num ? null : acc.push(room)
      })
      return acc
    }, [])
    return availableRooms
  }
  getBookingsByCustomer(id) {
    return this.bookingsData.filter(booking => booking.userID === id)
  }
  getQtyRoomsAvailableByDate(date) {
    return this.getAvailableRoomsByDate(date).length
  }
  filterByRoomType() {
    // filters all available room by type 
  }
  addAbooking() {
    // pushes a booking into the bookingsData
  }
}

export default Bookings;