class Bookings {
  constructor(bookingsData, rooms) {
    this.bookingsData = bookingsData;
    this.rooms = rooms;
    this.roomQuality = ["single room", "junior suite", "residential suite"]
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
  getPctRoomsAvailableByDate(date) {
    return Math.floor(100 - (this.getAvailableRoomsByDate(date).length / this.rooms.length * 100)) 
  }
  getEarningsByDate(date) {
    let todaysBookings = this.bookingsData.filter(booking => booking.date === date)
    return todaysBookings.reduce((acc, curr) => {
      let roomNumber = curr.roomNumber
      let foundRoom = this.rooms.find(room => room.number === roomNumber)
      return acc + foundRoom.costPerNight
    }, 0)
  }
  createAddBooking(id, date) {
    let custBookings = this.getBookingsByCustomer(id)
    let result = custBookings.findIndex(custBookings => custBookings.date === date)
    return  result === -1 ? result = false : result = true
  }
  filterByRoomType(date, roomType) {
    let availableRooms = this.getAvailableRoomsByDate(date)
    return availableRooms.filter(room => room.roomType === roomType)
  }
  addAbooking(id, date, roomNumber) {
    let newBooking = {
      ['userID']: id,
      ['date']: date,
      ['roomNumber']: roomNumber
    }
    this.bookingsData.push(newBooking)
  }
  deleteBooking(date, customerRepository) {
    let custRooms = this.getBookingsByCustomer(customerRepository.currentCustomer.id)
    let booking = custRooms.find(b => b.date === date)
    let index = this.bookingsData.findIndex(b => b === booking)
    this.bookingsData.splice(index, 1)
  }
  upgradeRoom(date, customerRepository) {
    let custRooms = this.getBookingsByCustomer(customerRepository.currentCustomer.id)
    let booking = custRooms.find(b => b.date === date)
    let index = this.bookingsData.findIndex(b => b === booking)
    this.bookingsData.splice(index, 1)
    let roomInd = this.roomQuality.findIndex(b => b.roomType === booking.roomType)
    let filteredRooms = this.filterByRoomType(date, this.roomQuality[roomInd + 1])
    return filteredRooms
  }
  
}

export default Bookings;