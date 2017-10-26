import React from 'react';
import { connect } from 'react-redux';
import Collapse from 'react-collapse';
import {Link} from 'react-router-dom';
import ProductList from './productList';
import moment from 'moment';


export default class Component extends React.Component {
  state = { showOrderDetails: this.props.initialOpen }

  _toggle = (e) => {
    e.preventDefault();
    this.setState({showOrderDetails: !this.state.showOrderDetails})
    if (this.props.onToggle)
      this.props.onToggle(!this.state.orderDetails);
  }

  render() {
    if (!this.props.order)
      return null
    return (
      <div style={{border: '1px solid #E8E8E8', borderRadius: '3px'}}>
        <div style={{padding: '15px'}}>
          <div style={{display: 'inline-block'}}>
          <a href={this.props.order.company.website} target="_blank">
            <img className="circle avatar" src={this.props.order.creator.profile.imageUrl || 'https://s3.amazonaws.com/pourpal/avatars/avatar.png'} style={{display: 'inline', height: '45px', width: '45px'}}/>
          </a>
          </div>
          <div style={{display: 'inline-block', verticalAlign: 'top', marginLeft: '15px'}}>
            <h4 style={{marginTop: 0, marginBottom: '3px'}}>{this.props.order.creator ? this.props.order.creator.profile.firstName + ' ' + this.props.order.creator.profile.lastName : ''}</h4>
            <h4 style={{marginTop: 0, color: '#76838f', fontSize: '14px'}}>{this.props.order.company.name}</h4>
          </div>
          <div style={{display: 'inline-block', verticalAlign: 'top', float: 'right', textAlign: 'right'}}>
            <h4 style={{marginTop: 0, marginBottom: '3px'}}>${(this.props.order.total || 0).toFixed(2)}</h4>
            <h4 style={{marginTop: 0, color: '#76838f', fontSize: '14px'}}>Created {moment(this.props.order.createdAt).format('M/D/YY')}</h4>
          </div>
        </div>
        <a href="#" onClick={this._toggle}>
          <div style={{backgroundColor: '#f8f8f8', textAlign: 'center'}}>
            <i className={this.state.showOrderDetails ? 'ion-chevron-up' : 'ion-chevron-down'} style={{fontSize: '18px', color: '#76838f', display: 'inline-block'}}></i>
            <h5 style={{color: '#76838f', display: 'inline-block', margin: '15px 10px 15px 10px'}}> {this.state.showOrderDetails ? 'Hide' : 'Show'} order details</h5>
          </div>
        </a>
        <Collapse isOpened={this.props.order._id && this.state.showOrderDetails} style={{backgroundColor: '#FFFFFF'}}>
          <ProductList {...this.props} />
        </Collapse>
      </div>
    )
  }
}
