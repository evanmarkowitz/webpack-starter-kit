class RoomService {
  constructor(allOrders) {
    this.allOrders = allOrders;
    this.menu = [{food: "Generic Plastic Sandwich",
      totalCost: 9.48}, {food: "Generic Soft Sandwich",
      totalCost: 24.24}
    ]
  }
  getAllRoomService(date) {
    return this.allOrders.filter(order => order.date === date)
  }
  getCustRoomServAllTime(id) {
    return this.allOrders.filter(order => order.userID === id)
  }
  getCustRoomServTotalByDay(id, date) {
    let todaysOrder = this.getAllRoomService(date)
    let customersData = todaysOrder.filter(order => order.userID === id)
    return customersData.reduce((acc, curr) => {
      return acc + curr.totalCost
    }, 0)
  }
  getCustRoomServTotalAllTime(id) {
    let customersData = this.getCustRoomServAllTime(id)
    return customersData.reduce((acc, curr) => {
      return acc + curr.totalCost
    }, 0)
  }
  getRoomServEarnByDate(date) {
    let todayRS = this.getAllRoomService(date)
    return todayRS.reduce((acc, curr) => {
      return acc + curr.totalCost
    }, 0)
  }
  returnCurrentMenu() {
    return this.menu
  }
  addOrder(custId, todaysDate, foodType) {
    let menuItem = this.menu.find(x => x.food === foodType)
    this.allOrders.push({userID: custId, date: todaysDate, food: foodType, totalCost: menuItem.totalCost}) 
  }
}

export default RoomService