import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../../actions/auth';

export default connect(mapStateToProps)(class Component extends React.Component {
  _login = (e) => {
    e.preventDefault();
    this.props.dispatch(Auth.login({email: this.refs.email.value, password: this.refs.password.value}));
  }

  render() {
    return (
      <div id="content" className="grey-blue login">
        <div className="primary-color animated fadeindown" style={{height: '100px'}}>
        </div>
        <form onSubmit={this._login} className="login-form animated fadeinup delay-2 z-depth-1">
          <h1>Login</h1>
          {this.props.error ? <h3 style={{color: 'red', textAlign: 'center', marginBottom: '40px'}}>{this.props.error}</h3> : null}
          <div className="input-field">
            <i className="ion-android-contact prefix"></i>
            <input placeholder="Email" ref="email" className="validate" id="login" type="text" />
          </div>

          <div className="input-field" style={{marginBottom: '20px'}}>
            <i className="ion-android-lock prefix"></i>
            <input placeholder="Password" ref="password" className="validate" id="login-psw" type="password" />
          </div>
          <button type="submit" className="waves-effect waves-light btn-large accent-color width-100 m-b-20 animated bouncein delay-4">Login</button>
        </form>
        <div style={{marginTop: '440px'}}>
          <a href="https://heapanalytics.com/?utm_source=badge" rel="nofollow"><img style={{width: '108px', height: '41px', marginLeft: 'auto', marginRight: 'auto'}} src="//heapanalytics.com/img/badgeLight.png" alt="Heap | Mobile and Web Analytics" /></a>
        </div>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return { error: state.auth.error}
}
