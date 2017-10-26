import cookie from 'react-cookie';

module.exports = {
  heapKey: '477544679',
  //API_URL: process.env.NODE_ENV == 'production' ? 'https://api.tangiblerm.com' : 'http://192.168.1.6:3000',
  API_URL: process.env.NODE_ENV == 'production' ? 'https://api.tangiblerm.com' : 'http://localhost:3000',
  CLIENT_ROOT_URL: process.env.NODE_ENV == 'production' ? 'https://m.tangiblerm.com' : 'http://localhost:8080',
  stripePublicKey: process.env.NODE_ENV == 'production' ? 'pk_live_W7FGmoWgd47DqUNfAm5cCv3F' : 'pk_test_3ro724fXGuhzFEQ7EdR5jbgw'
}
