import React from 'react';
import { connect } from 'react-redux';
import Auth from '../../actions/auth'

export default connect()(class Component extends React.Component {
  componentWillMount() {
    this.props.dispatch(Auth.logout(this));
  }

  render() {
    return null;
  }
})
