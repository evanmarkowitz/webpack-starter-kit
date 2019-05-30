class CustomerRepository {
  constructor(customers) {
    this.customers = customers;
  }
  findCustomerByID(id) {
    return this.customers.find(cust => cust.id === id)
  }
  findCustomerByName(name) {
    return this.customers.find(cust => cust.name === name)
  }
}

export default CustomerRepository