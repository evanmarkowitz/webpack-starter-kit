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

var customerData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users')
  .then(function(response) {
    return response.json()
  })
  .then(function(parsedData) {
    customerData = parsedData.users
  })
  .catch(err => console.error(err));

var roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms')
  .then(function(response) {
    return response.json()
  })
  .then(function(parsedData) {
    roomsData = parsedData.rooms
  })
  .catch(err => console.error(err));

var bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings')
  .then(function(response) {
    return response.json()
  })
  .then(function(parsedData) {
    bookingsData = parsedData.bookings
  })
  .catch(err => console.error(err));


var roomServicesData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices')
  .then(function(response) {
    return response.json()
  })
  .then(function(parsedData) {
    roomServicesData = parsedData.roomServices
  })
  .catch(err => console.error(err));

$( document ).ready(function() {
  let bookings;
  let roomService;
  let customerRepository
  let date = new Date()
  let today = new Date().toLocaleDateString("en-GB")

  async function instatiateBookings() {
    await roomsData
    await bookingsData 
    bookings = new Bookings(bookingsData, roomsData)
    console.log(bookings)
    await roomServicesData
    roomService = new RoomService(roomServicesData)
    await customerData
    console.log(customerData)
    let customers = customerData.map((user) => {
      return new Customer(user.name, user.id)
    })
    customerRepository = new CustomerRepository(customers)
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
      function calculateTodaysEarnings(today) {
        let roomServiceTot = roomService.getRoomServEarnByDate(today)
        let bookingsTot = bookings.getEarningsByDate(today)
        return roomServiceTot + bookingsTot
      }
    $('.orders--section').append(`
    <p>Room Service Orders Today: ${displayTodaysOrders(today)}</p>
    `)
    $('.rooms--section').append(`
    <p>Most booked date: ${bookings.getMostPopularDate()}</p>
    <p>Least booked date: ${bookings.getLeastPopularDate()}</p>
  `)
  $('.main--section').append(`
    <h1>${date}</h1>
    <p> Quanitity of Rooms Available: ${bookings.getQtyRoomsAvailableByDate(today)}</p>
    <p> Percent of Rooms Occupied: ${bookings.getPctRoomsAvailableByDate(today)}%</p>
    <p> Total Earnings today: ${calculateTodaysEarnings(today)}</p>
    `)
  }
  instatiateBookings()

    function mapCustOrders(customerOrders, custName) {
      let sortedData = customerOrders.map((order) => {
        return `<tr>
        <td>${custName}</td>
        <td>${order.userID}</td>
        <td>${order.food}</td> 
        <td>${order.totalCost}</td>
        </tr>`
      })
      return sortedData.join(' ')
    }

    function displayUsersOrders(custName, custId) {
      let customerOrders = roomService.getCustRoomServAllTime(custId)
      if (customerOrders.length ===  0) {
        return `${custName} Room Service Orders`
      } else {
        return `<table class = "orders-by-date-table"> 
          <tr>
            <th>Customer Name</th>
            <th>User ID</th>
            <th>Food</th> 
            <th>Total Cost</th>
          </tr>
            ${mapCustOrders(customerOrders, custName)}
        </table>
        <p>Total: ${roomService.getCustRoomServTotalAllTime(custId)}</p>`
      }
    }

    function mapCustBookings(customerBooks, custName) {
      let sortedData = customerBooks.map((order) => {
        return `<tr>
        <td>${custName}</td>
        <td>${order.userID}</td>
        <td>${order.date}</td> 
        <td>${order.roomNumber}</td>
        </tr>`
      })
      return sortedData.join(' ')
    }
  

    function displayUsersBookings(custName, custId) {
      let customerBooks = bookings.getBookingsByCustomer(custId)
      if (customerBooks.length ===  0) {
        return `${custName} has no bookings.`
      } else {
        return `<table class = "orders-by-date-table"> 
            <tr>
              <th>Customer Name</th>
              <th>User ID</th>
              <th>BookingDate</th> 
              <th>Room Number</th>
            </tr>
            <tr>
              ${mapCustBookings(customerBooks, custName)}
            </tr>
          </table>`
      }
    }

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
      console.log(foundCustomer.length)
      if (foundCustomer.length !== 0) {
        foundCustomer.forEach((cust) => {
          $('.customers--section').append(`
          <article class = 'customer--card' data-id=${cust.id}>
          <p>Customer Name: ${cust.name}</p>
          <p>Customer ID: ${cust.id}</p>
          <button class = 'select__this__customer'>Select This Customer</button>
          </article>`
          )
        })
      } else {
        $('.customers--section').append(` <article>
              <h3>We couldn't find that customer, press add customer or reviese the search field and search again.</h3>
            </article>`)
      }
    })
    function addBookingButton(id, today) {
      if (bookings.createAddBooking(id, today) === false) {
        $('.rooms--section').append(`<button class ='add__booking__button' type='button' >Add a booking</button>`)
      }
    }

    $('.customers--section').click(function(event) {
      if (event.target.className.includes('select__this__customer')) {
        let id = $(event.target).parent().data('id')
        let foundCustomer = customerRepository.findCustomerByID(id)
        $('.orders--section').append(`${displayUsersOrders(foundCustomer.name, id)}`)
        $('.rooms--section').append(`${displayUsersBookings(foundCustomer.name, foundCustomer.id)}`)
        addBookingButton(foundCustomer.id, today) 
        $('.customer--card').remove()
        $('.current--customer').append(`
        <article class = 'customer--card' data-id=${foundCustomer.id}>
        <h3>Current Customer</h3>
        <p>Customer Name: ${foundCustomer.name}</p>
        <p>Customer ID: ${foundCustomer.id}</p>
        </article>`
        )
      }
    })

    $('.add__cust__button').click(function() {
      let newId = customerRepository.findHighestId()
      let newCust = new Customer($('.search__cust__input').val(), newId + 1)
      $('.customers--section').prepend(`<p>Customer Name: ${newCust.name}`)
      $('.customers--section').prepend(`<p>Customer ID: ${newCust.id}`)
      customerRepository.addCustomer(newCust)
      customerRepository.selectCurrentCustomer(newCust)
    })

    $('.rooms--section').click(function() {
      if (event.target.className.includes('add__booking__button')) {
        $('.rooms--section').append(`
        <form class = 'add__booking__form'>
          <h3>Filter by room type</h3>
            <button class = 'single room'>Single Room</button>
            <button class = 'junior suite'>Junior Suite/button>
            <button class = 'residential suite'>Residential Suite</button>
        </form>
        `)
      }
    
    })
});