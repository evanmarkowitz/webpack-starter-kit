import chai from 'chai';
const expect = chai.expect;
import customersTD from '../data/customersTestData'
import Customer from '../src/customer'
import CustomerRepository from '../src/customerRepository'
import Bookings from '../src/bookings'
import bookingsTD from '../data/bookingsTestData'
import roomTD from '../data/roomTestData'



describe('Bookings', function() {
  let customers
  let customerRepository
  let customer1
  let customer9
  let bookings
  beforeEach(function() {
    customers = customersTD.users.map((user) => {
      return new Customer(user.name, user.id)
    })
    customerRepository = new CustomerRepository(customers)
    customer1 = new Customer('Autumn Toy', 1)
    customer9 = new Customer('Florine Jaskolski', 9)
    bookings = new Bookings(bookingsTD.bookings, roomTD.rooms)
  })
  it('should be an instance of Bookings', function() {
    expect(bookings).to.be.an.instanceOf(Bookings)
  });
  it('should hold all the bookings data', function() {
    expect(bookings.bookingsData).to.eql(bookingsTD.bookings)
  })
  it('should hold all the rooms data', function() {
    expect(bookings.rooms).to.eql(roomTD.rooms)
  })
  it('should get the date with the most rooms booked', function() {
    expect(bookings.getMostPopularDate()).to.equal('11/12/2019')
  })
  it('should get the date with the least rooms booked', function() {
    expect(bookings.getLeastPopularDate()).to.equal('05/06/2019')
  })
  it('should return a list of available rooms per a specific night', function() {
    expect(bookings.getAvailableRoomsByDate("05/06/2019")).to.deep.not.include({
      number: 4,
      roomType: "junior suite",
      bidet: false,
      bedSize: "twin",
      numBeds: 1,
      costPerNight: 192.48
    })
    expect(bookings.getAvailableRoomsByDate("05/01/2019")).to.deep.include({
      number: 4,
      roomType: "junior suite",
      bidet: false,
      bedSize: "twin",
      numBeds: 1,
      costPerNight: 192.48
    })
  })
  it('should return bookings by customer id', function() {
    expect(bookings.getBookingsByCustomer(81)).to.eql([{
      userID: 81,
      date: "11/12/2019",
      roomNumber: 165
    }])
  })
  it('should return the qty of rooms available by date', function() {
    expect(bookings.getQtyRoomsAvailableByDate("05/06/2019")).to.equal(14)
    expect(bookings.getQtyRoomsAvailableByDate("05/01/2019")).to.equal(15)
  })
})