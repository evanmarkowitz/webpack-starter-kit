class CustomerRepository {
  constructor(customers) {
    this.customers = customers;
    this.currentCustomer = {}
  }
  findCustomerByID(id) {
    return this.customers.find(cust => cust.id === id)
  }
  findCustomerByName(name) {
    return this.customers.filter(cust => cust.name.includes(name))
  }
  findHighestId() {
    let copy = this.customers
    return copy.sort((a, b) => b.id - a.id)[0].id
  }
  addCustomer(cust) {
    this.customers.push(cust)
  }
  selectCurrentCustomer(cust) {
    this.currentCustomer = cust
  }
}

export default CustomerRepository