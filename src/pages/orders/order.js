import React from 'react';
import { connect } from 'react-redux';
import MDSpinner from "react-md-spinner";
import Review from './review';
import Customer from './customer';
import Shipping from './shipping';
import Payment from './payment';
import Steps from '../../components/steps';
import Receipt from './receipt';
import NewLink from '../../components/newLink';
import Loading from '../../components/loading';

import Orders from '../../actions/orders';

export default connect(mapStateToProps)(class Component extends React.Component {
  state = {
    position: 0,
    showSuccess: false,
    attempts: 0
  }

  componentDidMount() {
    if (this.props.order)
      this._setTitle(this.props.order.status);
    else
      this.props.dispatch(Orders.get(this.props.orderId));
    this.props.dispatch({type: 'SET_SHIPPING', value: _.last(this.props.user.addresses)});
    this.props.dispatch({ type: 'SET_PAYMENT', value: _.last(this.props.user.cards) });
  }

  componentWillReceiveProps(nextProps) {
    const currentStatus = this.props.order && this.props.order.status;
    const nextStatus = nextProps.order && nextProps.order.status;
    if (nextStatus != currentStatus)
      this._setTitle(nextStatus);
  }

  _setTitle = (status) => {
    if (status == 'complete')
      this.props.dispatch({type: 'SET_MENU_TITLE', title: 'Receipt'})
    else
      this.props.dispatch({type: 'SET_MENU_TITLE', title: 'New Order'})
  }

  _changeStep = (i) => {
    this.setState({position: i});
  }

  _renderStep = () => {
    const steps = [
      () => <Review {...this.props}
              onClick={(e) => { e.preventDefault(); this._changeStep(this.state.position + 1) }}/>,
      () => <Customer {...this.props}
              onClickLeft={() => { this._changeStep(this.state.position - 1) }}
              onClickRight={() => { this._changeStep(this.state.position + 1) }} />,
      () => <Shipping {...this.props}
              onClickLeft={() => { this._changeStep(this.state.position -1) }}
              onClickRight={() => { this._changeStep(this.state.position + 1) }}
              />,
      () => <Payment {...this.props}
              onClickLeft={() => { this._changeStep(this.state.position - 1) }}
              onClickRight={(payment) => {
                this.props.dispatch(Orders.submit(this.props.order, {
                  customer: this.props.customer,
                  shipping: this.props.shipping,
                  payment: payment
                }));
              this.setState({
                attempts: this.state.attempts + 1,
                showSuccess: true
              });
              }} />
    ];
    return steps[this.state.position] ? steps[this.state.position]() : null;
  }

  render() {
    if (!this.props.user && this.props.tokenLoginStatus == 'failed')
      return <NewLink />
    if (!this.props.order || this.props.orderStatus == 'waiting')
      return <Loading message="Loading Order" top="200px" size={48} />
    if (this.props.orderStatus == 'submitting')
      return <Loading message="Submitting Order" top="200px" size={48} />
    if (this.props.order.status == 'complete' || this.props.orderStatus == 'success')
      return <Receipt {...this.props} showSuccess={this.state.showSuccess} />
    // else return the checkout form
    return (
      <div style={{marginBottom: '75px'}}>
        <Steps onClick={this._changeStep} steps={[{name: 'Order'}, {name: 'Customer'}, {name: 'Shipping'}, {name: 'Payment'}]} position={this.state.position} style={{paddingTop: '15px', paddingBottom: '10px'}}/>
        {this.props.orderStatus == 'error' ? <h4 style={{color: 'red', textAlign: 'center'}}>{this.props.error}</h4> : null}
        {this._renderStep()}
      </div>
    )
  }
})

function mapStateToProps(state, ownProps) {
  const orderId = ownProps.match.params.orderId;
  return {
    orderId,
    order: state.orders[orderId],
    user: state.user,
    cards: state.user.cards,
    payment: state.app.payment,
    orderStatus: state.app.orderStatus,
    error: state.app.orderError,
    customer: state.app.customer,
    shipping: state.app.shipping,
    payment: state.app.payment,
  }
}
