import React from 'react';
import { connect } from 'react-redux';

import Orders from '../actions/orders';

export default connect()(class Component extends React.Component {
  state = {}

  _sendNewLink(e) {
    e.preventDefault();
    this.props.dispatch(Orders.sendNewLink(this.props.orderId));
    this.setState({sent: true});
  }

  render() {
    return (
      <div style={{textAlign: 'center', marginTop: '50px'}}>
        <h2 style={{margin: '20px 30px 30px'}}>This link has expired</h2>
        <h4 style={{margin: '10px 30px 10px 30px'}}>To protect your account, each link we send may only be used once. Click the button below to have a new link sent to your phone.</h4>
        <div style={{marginTop: '30px', marginLeft: '20px', marginRight: '20px'}}>
          {this.state.sent ?
              <h4 style={{color: '#2196F3'}}>Link sent!</h4>
            : <button onClick={this._sendNewLink} className="waves-effect waves-light btn-large primary-color width-100">Text new link</button>
          }
        </div>
      </div>
    )
  }
})
