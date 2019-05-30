import chai from 'chai';
const expect = chai.expect;
import roomServiceTD from '../data/roomServicesTestData'
import RoomService from '../src/roomService'




describe('Customer', function() {
  let roomService

  beforeEach(function() {
    roomService = new RoomService(roomServiceTD.roomServices)
  })
  it('should be an instance of customer', function() {
    expect(roomService).to.be.an.instanceOf(RoomService)
  });
  it('should hold the rooms service data', function() {
    expect(roomService.allOrders).to.equal(roomServiceTD.roomServices)
  });
  it('should get all the room service by date', function() {
    expect(roomService.getAllRoomService("21/10/2019")).to.eql([{
      userID: 34,
      date: "21/10/2019",
      food: "Generic Plastic Sandwich",
      totalCost: 9.48
    }, {
      userID: 34,
      date: "21/10/2019",
      food: "Intelligent Metal Sandwich",
      totalCost: 7.57
    }])
  });
  it('should get a customers room service history by id', function() {
    expect(roomService.getCustRoomServAllTime(34)).to.eql(
      [{
        userID: 34,
        date: "21/10/2019",
        food: "Generic Plastic Sandwich",
        totalCost: 9.48
      }, {
        userID: 34,
        date: "21/10/2019",
        food: "Intelligent Metal Sandwich",
        totalCost: 7.57
      }
      ])
  })
  it('should get a customers room service total by id and date', function() {
    expect(roomService.getCustRoomServTotalByDay(34, "21/10/2019")).to.eql(17.05)
  })
  it('should get a customers room service total by id for all time', function() {
    expect(roomService.getCustRoomServTotalAllTime(34)).to.eql(17.05)
  })

})