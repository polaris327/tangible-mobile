import Store from '../config/store';

export default {
  getUserName: function() {
    const state = Store.getState();
    return (state.user.profile.firstName || '') + ' ' + (state.user.profile.lastName || '');
  },

  total: function(order) {
    let total = 0;
    // Add products
    _.each(order.products, (product, i) => {
      total += product.quantity * product.price;
    });
    // Add promo
    if (order.promo) {
      if (order.promo.type == 'amount')
        total -= Number(order.promo.value);
        if (order.promo.type == 'percent')
          total = total * (1 - (Number(order.promo.value)/100));
    }
    // Add shipping
    if (order.shipping)
      total += order.shipping;
    return total;
  }
}
