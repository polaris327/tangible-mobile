import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderSummary from '../../components/orderSummary';
import Orders from '../../actions/orders';

export default class Component extends React.Component {
  _renderSuccess = () => {
    return (
      <div>
        <div style={{marginTop: '30px'}}></div>
        <div className="svg" style={{textAlign: 'center'}}>
          <svg width="100" height="100" viewBox="-263.5 236.5 26 26">
            <g className="svg-success">
              <circle cx="-250.5" cy="249.5" r="12"/>
              <path d="M-256.46 249.65l3.9 3.74 8.02-7.8"/>
            </g>
          </svg>
          <h2 style={{textAlign: 'center'}}>Order successful!</h2>
        </div>
        <h4 style={{textAlign: 'center', margin: '20px 50px 50px 20px'}}>Your order is on the way and a receipt has been emailed to you</h4>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.showSuccess ? this._renderSuccess() : null}
        <div style={{margin: '10px'}}>
          <OrderSummary orderId={this.props.orderId} initialOpen={!this.props.showSuccess} {...this.props} />
        </div>
      </div>
    )
  }
};
