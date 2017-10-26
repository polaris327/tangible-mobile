import React from 'react';
import { connect } from 'react-redux';
import MDSpinner from "react-md-spinner";
import Users from '../../actions/users';
import Card from 'creditcards/card';
import Validate from '../../helpers/validate';

export default connect()(class Component extends React.Component {
  _onClick = (direction) => {
    let payment = null;
    if (this.props.order.payment)
      payment = this.props.order.payment;
    else if (this.props.payment && this.props.payment.id)
      payment = _.find(this.props.user.cards, (card) => {return card.id == this.props.payment.id});
    else
      payment = this.refs.inputs.get();
    this.props.dispatch({ type: 'SET_PAYMENT', value: payment })
    if (direction == 'left' && this.props.onClickLeft)
      this.props.onClickLeft();
    else if (direction == 'right' && this.props.onClickRight) {
      const error = Validate.payment(payment);
      if (error)
        this.props.dispatch({type: 'SET_ORDER_ERROR', error });
      else {
        this.props.dispatch({type: 'SET_ORDER_STATUS', value: 'ready'});
        this.props.onClickRight(payment)
      }
    }
  }

  render() {
    if (this.props.order.payment)
      return (
        <div>
          <h3 style={{textAlign: 'center', marginTop: '30px'}}>Order has already been paid</h3>
          <Buttons onClick={this._onClick} />
        </div>
      )
    else
        return (
          <div>
            <h4 style={{marginLeft: '20px', marginRight: '20px', textAlign: 'center'}}>
              Select or enter your payment details
            </h4>
            <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
                <div className="form-inputs" style={{padding: 0}}>
                  <Select
                    value={this.props.payment}
                    cards={this.props.cards}
                    dispatch={this.props.dispatch} />
                  { this.props.payment && this.props.payment.id ? <CreditCard {...this.props}/> : <Inputs ref="inputs" value={this.props.payment} /> }
                  <a href="https://www.stripe.com" target="_blank">
                    <img src="https://s3.amazonaws.com/pourpal/images/powered_by_stripe.png" style={{width: '119px', height: '26px', marginTop: '25px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto'}}/>
                  </a>
                </div>
            </div>
            <Buttons onClick={this._onClick} />
          </div>
        )
    }
})

const Select = (props) => {
    if (!(props.cards && props.cards.length))
      return null;
    const value = props.value;
    return (
      <div>
      <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit',color: '#5e5e5e'}}>Your payment methods</label>
      <select onChange={(e) => props.dispatch({type: 'SET_PAYMENT', value: {id: e.target.value == 'new' ? null : e.target.value}})  }
        value={(value && value.id) || 'new'} className="browser-default" style={{fontSize: '16px', backgroundColor: 'transparent', border: '1px solid #9e9e9e', borderRadius: '2px', marginTop: '5px'}}>
        <option value="new">New Credit Card</option>
        {_.map(props.cards, (card, i) => {
          return <option key={i} value={card.id}>{card.brand + ' - ends in ' + card.last4}</option>
        })}
      </select>
      </div>
    )
  }

const CreditCard = (props) => (
  <div style={{marginTop: '20px'}}>
    <button onClick={(e) => {
        props.dispatch({ type: 'SET_PAYMENT', value: {} })
      }} className="waves-effect btn waves-light" style={{zIndex: 0, color: '#76838f', backgroundColor: '#eee', float: 'right', paddingLeft: '14px', paddingRight: '14px', minWidth: '80px'}}>New</button>
    <button onClick={(e) => {
        props.dispatch(Users.removeCard(props.payment.id));
        props.dispatch({ type: 'SET_PAYMENT', value: {} })
      }} className="waves-effect btn waves-light" style={{zIndex: 0, color: '#76838f', backgroundColor: '#eee', float: 'right', paddingLeft: '14px', paddingRight: '14px', marginRight: '15px', minWidth: '80px'}}>Delete</button>
    <div className="clearfix"></div>
  </div>
)

class Inputs extends React.Component {
  get = () => {
    return {
      ccNumber: Card.parse(this.refs.ccNumber.value),
      ccExpMonth: this.refs.ccExpMonth.value,
      ccExpYear: this.refs.ccExpYear.value.substr(2,2),
      ccCVC: this.refs.ccCVC.value,
      ccZip: this.refs.ccZip.value,
      save: this.refs.ccSave.checked,
    }
  }

  render() {
    return (
      <div>
        <div className="input-field">
          <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>Credit Card Number</label>
          <input ref="ccNumber" type="tel" className="validate" style={{margin: 0, height: '2.5rem', fontSize: '16px'}}
            onKeyUp={ (e) => this.refs.ccNumber.value = Card.format(Card.parse(e.target.value), '-') }
            defaultValue={ Card.format(this.props.value && this.props.value.ccNumber || '', '-') } />
        </div>
        <div style={{marginTop: '10px'}}>
          <div style={{display: 'inline-block', width: '30%'}}>
            <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit',color: '#5e5e5e'}}>Month</label>
            <select defaultValue={ (this.props.value && this.props.value.ccExpMonth) || '01'}
              ref="ccExpMonth" className="browser-default" style={{fontSize: '16px', backgroundColor: 'transparent', border: '1px solid #9e9e9e', borderRadius: '2px', marginTop: '5px'}}>
              {months}
            </select>
          </div>
          <div style={{display: 'inline-block', width: '30%', marginLeft: '10px'}}>
            <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit',color: '#5e5e5e'}}>Year</label>
            <select defaultValue={ (this.props.value && ('20' + this.props.value.ccExpYear)) || '2017'}
              ref="ccExpYear" className="browser-default" style={{fontSize: '16px', backgroundColor: 'transparent', border: '1px solid #9e9e9e', borderRadius: '2px', marginTop: '5px'}}>
              {years}
            </select>
          </div>
          <div className="input-field" style={{display: 'inline-block', width: '30%', color: '#5e5e5e', float: 'right', marginTop: 0}}>
            <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>CVC</label>
            <input defaultValue={ (this.props.value && this.props.value.ccCVC) || '' }
              type="tel" maxLength={4} ref="ccCVC" className="validate" style={{margin: 0, height: '2.5rem', fontSize: '16px', marginTop: '10px'}} />
          </div>
        </div>
        <div className="input-field" style={{width: '50%'}}>
          <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>Billing Address Zip</label>
          <input ref="ccZip" type="tel" className="validate" style={{margin: 0, height: '2.5rem', fontSize: '16px'}}
            defaultValue={ (this.props.value && this.props.value.ccZip) || '' } />
        </div>
        <div className="input-field" style={{display: 'inline-block'}}>
          <input defaultChecked={true}
            id="save" ref="ccSave" type="checkbox" />
          <label htmlFor="save" style={{color: '#76838f'}}>Save for this phone</label>
        </div>
      </div>
    )
  }
}

let months = [];
for (var i = 1; i < 13; i++)
  months.push(<option key={'m'+ i} value={i < 10 ? '0'+i : i.toString()}>{i < 10 ? '0'+i : i.toString()}</option>)

let years = [];
for (var i = 2017; i < 2032; i++)
  years.push(<option key={'y'+ i} value={i}>{i}</option>)


const Buttons = (props) => (
  <div style={{position: 'fixed', bottom: '0px', height: '60px', maxWidth: '600px', width: '100%'}}>
    <button onClick={(e) => {e.preventDefault(); props.onClick('left')}} className="waves-effect waves-light btn-large primary-color"
      style={{display: 'inline-block', width: '50%', height: '100%', boxShadow: 'none', borderRadius: 0}}>
      Back
    </button>
    <button onClick={(e) => {e.preventDefault(); props.onClick('right')}} className="waves-effect waves-light btn-large primary-color"
      style={{display: 'inline-block', width: '50%', height: '100%', boxShadow: 'none', borderRadius: 0, float: 'right', borderLeft: '1px solid #f8f8f8'}}>
      Complete Order
    </button>
  </div>
)
