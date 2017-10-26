import React from 'react';
import { Link } from 'react-router-dom';
import { UpdateSettings } from '../../actions/users';
import { connect } from 'react-redux';
import Users from '../../actions/users';
import Loading from '../../components/loading';

export default connect(mapStateToProps)(class Component extends React.Component {
    _save = (e) => {
      e.preventDefault();
      this.props.dispatch(Users.update({
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        email: this.refs.email.value,
        phone: this.refs.phone.value
      }));
      this.props.history.push('/settings/saved');
    }

    render() {
      if (this.props.user)
      return (
      <form onSubmit={this._save}>
        <div className="form-inputs">
          <div className="input-field" style={{marginTop: 0}}>
            <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>First Name</label>
            <input ref="firstName" defaultValue={this.props.user.profile.firstName || ''} placeholder="My first Name..." type="text" className="validate" style={{marginBottom: 0, fontSize: '16px', height: '2.5rem'}} />
          </div>
          <div className="input-field" style={{marginTop: 0}}>
            <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>Last Name</label>
            <input ref="lastName" defaultValue={this.props.user.profile.lastName || ''} placeholder="My Last Name..." type="text" className="validate" style={{marginBottom: 0, fontSize: '16px', height: '2.5rem'}} />
          </div>
          <div className="input-field" style={{marginTop: 0}}>
            <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>Email</label>
            <input ref="email" defaultValue={this.props.user.email || ''} placeholder="My email..." type="email" className="validate" style={{marginBottom: 0, fontSize: '16px', height: '2.5rem'}} />
          </div>
          <div className="input-field" style={{marginTop: 0}}>
            <label style={{fontSize: '.9rem', position: 'inherit', top: '0.2rem', left: 'inherit', color: '#5e5e5e'}}>Mobile Phone</label>
            <input ref="phone" defaultValue={this.props.user.phone || ''} placeholder="My mobile phone #..." type="tel" className="validate" style={{marginBottom: 0, fontSize: '16px', height: '2.5rem'}} />
          </div>
        </div>
        <button type="submit" className="waves-effect waves-light btn-large primary-color width-100" style={{position: 'fixed', bottom: 0, maxWidth: '600px'}}>Save</button>
      </form>
    )
    else
      <Loading top="200px" size={48} />
  }
})

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
