/* eslint-disable no-console */
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/bell.svg'
import RoomService from './roomService';
import Bookings from './bookings'
import Customer from './customer';
import CustomerRepository from './customerRepository';


console.log('This is the JavaScript entry file - your code begins here.');

var customerData;
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users')
  .then(function(response) {
    return response.json()
  })
  .then(function(parsedData) {
    customerData = parsedData.users
  })
  .catch(err => console.error(err));

var roomsData;
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms')
  .then(function(response) {
    return response.json()
  })
  .then(function(parsedData) {
    roomsData = parsedData.rooms
  })
  .catch(err => console.error(err));

var bookingsData;
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings')
  .then(function(response) {
    return response.json()
  })
  .then(function(parsedData) {
    bookingsData = parsedData.bookings
  })
  .catch(err => console.error(err));


var roomServicesData;
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices')
  .then(function(response) {
    return response.json()
  })
  .then(function(parsedData) {
    roomServicesData = parsedData.roomServices
    console.log(roomServicesData)
  })
  .catch(err => console.error(err));

$( document ).ready(function() {
  let bookings;
  let roomService;
  let customerRepository
  let date = new Date()
  let today = `"${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}"`
  

  setTimeout(function() { 
    bookings = new Bookings(bookingsData, roomsData)
    roomService = new RoomService(roomServicesData)
    let customers = customerData.map((user) => {
      return new Customer(user.name, user.id)
    })
    customerRepository = new CustomerRepository(customers)
    console.log(bookings)
    function calculateTodaysEarnings(today) {
      let roomServiceTot = roomService.getRoomServEarnByDate(today)
      let bookingsTot = bookings.getEarningsByDate(today)
      return roomServiceTot + bookingsTot
    }
    $('.main--section').append(
      `
      <h1>${date}</h1>
      <p> Quanitity of Rooms Available: ${bookings.getQtyRoomsAvailableByDate(today)}</p>
      <p> Percent of Rooms Occupied: ${bookings.getPctRoomsAvailableByDate(today)}%</p>
      <p> Total Earnings today: ${calculateTodaysEarnings(today)}</p>
      `)
    function displayTodaysOrders(today) {
      let todaysOrders = roomService.getAllRoomService(today)
      console.log(todaysOrders)
      if (todaysOrders.length ===  0) {
        return "You have no Room Service Orders"
      } else {
        return todaysOrders.map((order) => {
          return `<table class = "orders-by-date-table"> 
            <tr>
              <th>User ID</th>
              <th>Food</th> 
              <th>Total Cost</th>
            </tr>
            return
            <tr>
              <td>${order.userID}</td>
              <td>${order.food}</td> 
              <td>${order.totalCost}</td>
            </tr>
          </table>`
        })
      }}

    function displayUsersOrders(custName, custId) {
      let customerOrders = roomService.getCustRoomServAllTime(custId)
      if (customerOrders.length ===  0) {
        return `${custName} Room Service Orders`
      } else {
        return customerOrders.map((order) => {
          return `<table class = "orders-by-date-table"> 
              <tr>
                <th>Customer Name</th>
                <th>User ID</th>
                <th>Food</th> 
                <th>Total Cost</th>
              </tr>
              return
              <tr>
                <td>${custName}</td>
                <td>${order.userID}</td>
                <td>${order.food}</td> 
                <td>${order.totalCost}</td>
              </tr>
            </table>`
        })
      }
    }
    function displayUsersBookings(custName, custId) {
      let customerBooks = bookings.getBookingsByCustomer(custId)
      if (customerBooks.length ===  0) {
        return `${custName} has no bookings.`
      } else {
        return customerBooks.map((order) => {
          return `<table class = "orders-by-date-table"> 
            <tr>
              <th>Customer Name</th>
              <th>User ID</th>
              <th>BookingDate</th> 
              <th>Room Number</th>
            </tr>
            return
            <tr>
              <td>${custName}</td>
              <td>${order.userID}</td>
              <td>${order.date}</td> 
              <td>${order.roomNumber}</td>
            </tr>
          </table>`
        })
      }
    }
    
    $('.orders--section').append(`
      <p>Room Service Orders Today: ${displayTodaysOrders(today)}</p>
    `)
    $('.rooms--section').append(`
      <p>Most booked date: ${bookings.getMostPopularDate()}</p>
      <p>Least booked date: ${bookings.getLeastPopularDate()}</p>
    `)



    function changeScreen(show) {
      $('.main--section').hide()
      $('.orders--section').hide()
      $('.rooms--section').hide()
      $('.customers--section').hide()
      $(show).show()
    }

    $('.orders__button').click(function() {
      changeScreen('.orders--section')
      $()
    })

    $('.main__button').click(function() {
      changeScreen('.main--section')

    })

    $('.rooms__button').click(function() {
      changeScreen('.rooms--section')

    })

    $('.customers__button').click(function() {
      changeScreen('.customers--section')
    })

    $('.orders--section').hide()
    $('.rooms--section').hide()
    $('.customers--section').hide()

    $('.submit__date__button').on('click', function() {
      var date = new Date($('#date-input').val());
      let day = date.getDate().toString().length  === 1 ? "0" + (date.getDate() + 1) : date.getDate() + 1
      let month = date.getMonth().toString().length  === 1 ?  (date.getMonth() + 1) : date.getMonth() + 1
      let year = date.getFullYear();
      let formatDate = `${[day, month, year].join('/')}`
      $('.orders--section').append(`Orders for ${formatDate}: ${displayTodaysOrders(formatDate)}`)
    });


    $('.search__cust__button').click(function() {
      let name = $('.search__cust__input').val()
      let foundCustomer = customerRepository.findCustomerByName(name)
      if (foundCustomer !== undefined) {
        $('.customers--section').append(`<p>Customer Name: ${foundCustomer.name}`)
        $('.customers--section').append(`<p>Customer ID: ${foundCustomer.id}`)
        $('.orders--section').append(`${displayUsersOrders(foundCustomer.name, foundCustomer.id)}`)
        $('.orders--section').append(`<p>Total: ${roomService.getCustRoomServTotalAllTime(foundCustomer.id)}`)
        $('.rooms--section').append(`${displayUsersBookings(foundCustomer.name, foundCustomer.id)}`)
        $('.rooms--section').append(`hi`)
      // } else {
      //   $(`
      //   <article>
      //     <h3>We couldn't find that customer, would you like to search 
      //   </article>
      //   `)
      // }
    })

  }, 2000);
});