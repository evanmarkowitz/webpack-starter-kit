import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/customer'



describe('Customer', function() {
  let customer1
  let customer2
  beforeEach(function() {
    customer1 = new Customer('Autumn Toy', 1)
    customer2 = new Customer('Jannie VonRueden', 2)
  })
  it('should be an instance of customer', function() {
    expect(customer1).to.be.an.instanceOf(Customer)
  });
  it('should have a name', function() {
    expect(customer1.name).to.equal('Autumn Toy')
    expect(customer2.name).to.equal('Jannie VonRueden')
  });
  it('should have an id', function() {
    expect(customer1.id).to.equal(1)
    expect(customer2.id).to.equal(2)
  });
})