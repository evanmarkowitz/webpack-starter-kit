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
  let newCust
  beforeEach(function() {
    customers = customersTD.users.map((user) => {
      return new Customer(user.name, user.id)
    })
    customerRepository = new CustomerRepository(customers)
    customer1 = new Customer('Autumn Toy', 1)
    customer9 = new Customer('Florine Jaskolski', 9)
    newCust = new Customer('Evan Markowitz', 105)
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
  it('should return the pct of rooms available by date', function() {
    expect(bookings.getPctRoomsAvailableByDate("05/06/2019")).to.equal(6)
    expect(bookings.getPctRoomsAvailableByDate("05/01/2019")).to.equal(0)
  })
  it('should return the earnings of rooms by date', function() {
    expect(bookings.getEarningsByDate("05/06/2019")).to.equal(192.48)
    expect(bookings.getEarningsByDate("05/01/2019")).to.equal(0)
  })
  it('should return whether a customer has a booking on a given date', function() {
    expect(bookings.createAddBooking(46, "04/08/2019") ).to.equal(true)
    expect(bookings.createAddBooking(46, "04/09/2019") ).to.equal(false)
  });
  it('should accept new bookings', function () {
    expect(bookings.bookingsData).to.deep.not.include({
      userID: 53,
      date: "11/12/2019",
      roomNumber: 8
    })
    bookings.addAbooking(53, "11/12/2019", 8)
    expect(bookings.bookingsData).to.deep.include({
      userID: 53,
      date: "11/12/2019",
      roomNumber: 8
    })
  });
  it('should be able to delete a booking', function() {
    customerRepository.selectCurrentCustomer(newCust)
    bookings.addAbooking(105, "11/04/2019", 2 )
    expect(bookings.bookingsData).to.deep.include({
      userID: 105,
      date: "11/04/2019",
      roomNumber: 2
    })
    bookings.deleteBooking("11/04/2019", customerRepository)
    expect(bookings.bookingsData).to.deep.not.include({
      userID: 105,
      date: "11/04/2019",
      roomNumber: 2
    })
  })
})