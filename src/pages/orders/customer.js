import React from 'react';
import MDSpinner from "react-md-spinner";
import { connect } from 'react-redux';
import Validate from '../../helpers/validate';

export default connect()(class Component extends React.Component {
  _onClick = (direction) => {
    let fields = ['firstName', 'lastName', 'phone', 'email'];
    let customer = {};
    _.each(fields, (field, i) => {
      customer[field] = this.refs[field].value;
    })
    if (direction == 'left' && this.props.onClickLeft)
      this.props.onClickLeft(customer);
    else if (direction == 'right' && this.props.onClickRight) {
      const error = Validate.customer(customer);
      if (error)
        this.props.dispatch({type: 'SET_ORDER_ERROR', error });
      else {
        this.props.dispatch({type: 'SET_ORDER_STATUS', value: 'ready'});
        this.props.onClickRight(customer)
      }
    }
    this.props.dispatch({ type: 'SET_CUSTOMER', value: customer })
  }

  render() {
    return (
      <div>
        <h4 style={{marginLeft: '20px', marginRight: '20px', textAlign: 'center'}}>
          First we need some basic info
        </h4>
        <form className="form-inputs" style={{paddingTop: 0}}>
          <div className="input-field">
            <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>First Name</label>
            <input ref="firstName" defaultValue={this.props.user.profile.firstName || ''} placeholder="Enter First Name..." type="text" className="validate" style={{marginBottom: 0, fontSize: '16px', height: '2.5rem'}} />
          </div>
          <div className="input-field">
            <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>Last Name</label>
            <input ref="lastName" defaultValue={this.props.user.profile.lastName || ''} placeholder="Enter Last Name..." type="text" className="validate" style={{marginBottom: 0, fontSize: '16px', height: '2.5rem'}} />
          </div>
          <div className="input-field">
            <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>Mobile Phone</label>
            <input ref="phone" defaultValue={this.props.user.phone || ''} placeholder="Enter Mobile Phone #..." type="tel" className="validate" style={{marginBottom: 0, fontSize: '16px', height: '2.5rem'}} />
          </div>
          <div className="input-field">
            <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>Email</label>
            <input ref="email" defaultValue={this.props.user.email || ''} placeholder="Enter Email..." type="email" className="validate" style={{marginBottom: 0, fontSize: '16px', height: '2.5rem'}} />
          </div>
        </form>
        <Buttons onClick={this._onClick}/>
      </div>
    )
  }
})

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
