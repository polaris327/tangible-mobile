import React from 'react';
import MDSpinner from "react-md-spinner";
import { connect } from 'react-redux';
import Users from '../../actions/users';
import Validate from '../../helpers/validate';

export default connect()(class Component extends React.Component {
  _onClick = (direction) => {
    let shipping = null;
    if (this.props.shipping && this.props.shipping._id)
      shipping = _.find(this.props.user.addresses, (address) => {return address._id == this.props.shipping._id});
    else {
      shipping = this.refs.inputs.get();
    }
    this.props.dispatch({ type: 'SET_SHIPPING', value: shipping })
    if (direction == 'left' && this.props.onClickLeft)
      this.props.onClickLeft();
    else if (direction == 'right' && this.props.onClickRight) {
      const error = Validate.shipping(shipping);
      if (error)
        this.props.dispatch({type: 'SET_ORDER_ERROR', error });
      else {
        this.props.dispatch({type: 'SET_ORDER_STATUS', value: 'ready'});
        this.props.onClickRight()
      }
    }
  }

  render() {
    return (
      <div>
        <h4 style={{marginLeft: '20px', marginRight: '20px', textAlign: 'center'}}>
          {this.props.user.addresses.length ? 'Select a shipping address for this order' : 'Enter a shipping address for this order'}
        </h4>
        <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
          <div className="form-inputs" style={{padding: 0}}>
            <div>
              <Select ref="select"
                value={this.props.shipping}
                addresses={this.props.user.addresses}
                dispatch={this.props.dispatch}
                />
              {this.props.shipping && this.props.shipping._id ?
                <Address
                  new={() => this.props.dispatch({ type: 'SET_SHIPPING', value: {} })}
                  remove={() => {
                    this.props.dispatch(Users.removeAddress(this.props.shipping._id));
                    this.props.dispatch({ type: 'SET_SHIPPING', value: {} })
                  }} /> :
                <Inputs ref="inputs" value={this.props.payment} /> }
            </div>
          </div>
        </div>
        <Buttons onClick={this._onClick} />
      </div>
    )
  }
})

class Select extends React.Component {
  render() {
    if (!(this.props.addresses && this.props.addresses.length))
      return null;
    const value = this.props.value;
    const last = _.last(this.props.addresses);
    return (
    <div>
      <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit',color: '#5e5e5e'}}>Your shipping addresses</label>
      <select onChange={(e) => this.props.dispatch({type: 'SET_SHIPPING', value: {_id: e.target.value == 'new' ? null : e.target.value}})  } ref="address" value={(value && value._id) || 'new'} className="browser-default" style={{backgroundColor: 'transparent', fontSize: '16px', border: '1px solid #9e9e9e', borderRadius: '2px', marginTop: '5px'}}>
        <option value="new">New Address</option>
        {_.map(this.props.addresses, (address, i) => {
          return <option key={i} value={address._id || i}>{address.name + ' - ' + address.street + ', ' + address.zip}</option>
        })}
      </select>
    </div>
    )
  }
}

class Inputs extends React.Component {
  get = () => {
    return {
      name: this.refs.name.value,
      street: this.refs.street.value,
      zip: this.refs.zip.value
    }
  }

  render() {
    return (
    <div>
      <div className="input-field" style={{marginTop: '10px'}}>
        <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit',color: '#5e5e5e'}}>Shipping Name</label>
        <input defaultValue={this.props.value && this.props.value.name} ref="name" placeholder="Name..." type="text" className="validate" style={{margin: 0, height: '2.5rem', fontSize: '16px'}} />
      </div>
      <div className="input-field">
        <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>Street</label>
        <input defaultValue={this.props.value && this.props.value.street} ref="street" placeholder="Street..." type="text" className="validate" style={{margin: 0, height: '2.5rem', fontSize: '16px'}} />
      </div>
      <div className="input-field" style={{display: 'inline-block', width: '40%'}}>
        <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>Zip Code</label>
        <input defaultValue={this.props.value && this.props.value.zip} ref="zip" placeholder="Zip..." id="lastName" type="text" className="validate" style={{margin: 0, height: '2.5rem', fontSize: '16px'}} />
      </div>
    </div>
    )
  }
}

const Address = (props) => (
  <div style={{marginTop: '20px'}}>
    <button onClick={props.new} className="waves-effect btn waves-light" style={{zIndex: 0, color: '#76838f', backgroundColor: '#eee', float: 'right', paddingLeft: '14px', paddingRight: '14px', minWidth: '80px'}}>New</button>
    <button onClick={props.remove} className="waves-effect btn waves-light" style={{zIndex: 0, color: '#76838f', backgroundColor: '#eee', float: 'right', paddingLeft: '14px', paddingRight: '14px', marginRight: '15px', minWidth: '80px'}}>Delete</button>
    <div className="clearfix"></div>
  </div>
)

const Buttons = (props) => (
  <div style={{position: 'fixed', bottom: '0px', height: '60px', maxWidth: '600px', width: '100%'}}>
    <button onClick={(e) => {e.preventDefault(); props.onClick('left')}} className="waves-effect waves-light btn-large primary-color"
      style={{display: 'inline-block', width: '50%', height: '100%', boxShadow: 'none', borderRadius: 0}}>
      Back
    </button>
    <button onClick={(e) => {e.preventDefault(); props.onClick('right')}} className="waves-effect waves-light btn-large primary-color"
      style={{display: 'inline-block', width: '50%', height: '100%', boxShadow: 'none', borderRadius: 0, float: 'right', borderLeft: '1px solid #f8f8f8'}}>
      Next
    </button>
  </div>
)
