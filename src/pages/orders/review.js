import React from 'react';
import OrderSummary from '../../components/orderSummary';

export default (props) => {
  return (
      <div>
        <h4 style={{marginLeft: '20px', marginRight: '20px', marginBottom: '20px', textAlign: 'center'}}>
          Review your order then click Next
          {props.order.demo ? <h4 style={{color: 'red', textAlign: 'center'}}>Demo order (card will not be charged)</h4> : null}
        </h4>
        <div style={{margin: '10px'}}>
          <OrderSummary editable initialOpen={true} {...props} />
        </div>
        <div style={{textAlign: 'center', marginTop: '20px'}}>By clicking Next, you agree to our <a href="https://www.tangiblerm.com/terms" target="_blank" style={{textDecoration: 'none', color: '#039be5'}}>Terms</a> and <a target="_blank" href="https://www.tangiblerm.com/privacy" style={{textDecoration: 'none', color: '#039be5'}}>Privacy Policy</a></div>
        <button onClick={props.onClick} className="waves-effect waves-light btn-large primary-color width-100" style={{zIndex: 0, position: 'fixed', bottom: 0, height: '60px', maxWidth: '600px'}}>Next</button>
      </div>
  )
}
