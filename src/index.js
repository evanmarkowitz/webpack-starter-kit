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
  })
  .catch(err => console.error(err));
let bookings;
let roomService;
let customerRepository
$( document ).ready(function() {
  
  setTimeout(function() { 
    bookings = new Bookings(bookingsData, roomsData)
    roomService = new RoomService(roomServicesData)
    let customers = customerData.map((user) => {
      return new Customer(user.name, user.id)
    })
    customerRepository = new CustomerRepository(customers)
  }, 1000);

  // $('.main--section').append()




});