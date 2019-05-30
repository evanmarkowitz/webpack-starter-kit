import chai from 'chai';
const expect = chai.expect;
import customersTD from '../data/customersTestData'
import Customer from '../src/customer'
import CustomerRepository from '../src/customerRepository'



describe('Customer Repository', function() {
  let customers
  let customerRepository
  let customer1
  let customer9
  beforeEach(function() {
    customers = customersTD.users.map((user) => {
      return new Customer(user.name, user.id)
    })
    customerRepository = new CustomerRepository(customers)
    customer1 = new Customer('Autumn Toy', 1)
    customer9 = new Customer('Florine Jaskolski', 9)
  })
  it('should be an instance of customer', function() {
    expect(customerRepository).to.be.an.instanceOf(CustomerRepository)
  });
  it('should hold all the customers', function() {
    expect(customerRepository.customers[0]).to.eql(customer1)
    expect(customerRepository.customers[8]).to.eql(customer9)
  });
  it('should find the customer by id', function() {
    expect(customerRepository.findCustomerByID(1)).to.eql(customer1)
    expect(customerRepository.findCustomerByID(9)).to.eql(customer9)
  });
  it('should find the customer by name', function() {
    expect(customerRepository.findCustomerByName('Autumn Toy')).to.eql(customer1)
    expect(customerRepository.findCustomerByName('Florine Jaskolski')).to.eql(customer9)
  });
})