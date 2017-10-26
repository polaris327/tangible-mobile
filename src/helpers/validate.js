import validator from 'validator';
import Card from 'creditcards/card';

export default {
  shipping: function(shipping) {
    // Check for Shipping Address
    if (shipping._id)
      return null;
    // Check for all fields
    if (!shipping.name.length)
      return 'Shipping name required';
    if (!shipping.street.length)
      return 'Shipping street required';
    if (!shipping.zip.length)
      return 'Shipping zip required';
    if (shipping.zip.length != 5)
      return 'Zip code not valid';
  },
  customer: function(customer) {
    // Check for all fields
    if (!(customer.firstName && customer.firstName.length))
      return 'First name required';
    if (!(customer.lastName && customer.lastName.length))
      return 'Last name required';
    if (!(customer.email && customer.email.length && validator.isEmail(customer.email)))
      return 'Valid email required';
  },
  payment: function (payment) {
    if (payment.id || payment.stripeChargeId)
      return null;
    if (!Card.isValid(Card.parse(payment.ccNumber)))
      return 'Invalid card number';
    if (payment.ccCVC && payment.ccCVC.length > 4)
      return 'Invalid CVC';
    if (payment.ccZip && payment.ccZip.length != 5)
      return 'Invalid Zip Code';
  }
}
