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
    console.log(roomServicesData)
  })
  .catch(err => console.error(err));

export default {customerData, roomsData, bookingsData, roomServicesData}