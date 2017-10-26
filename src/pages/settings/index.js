import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

export default connect()(class Component extends React.Component {
  componentDidMount() {
    this.props.dispatch({type: 'SET_MENU_TITLE', title: 'Settings'});
  }

  render() {
    return (
    <div id="content" className="page">
      {_.map(SettingsOptions, (option, i) => {
        return (
          <Link to={'/settings' + option.path} key={i}>
            <div className="single-news animated fadeinright delay-2" style={{backgroundColor: '#FFFFFF', padding: '10px 20px 10px 20px'}}>
              <h4 className="single-news-title" style={{display: 'inline-block'}}>{option.name}</h4>
              <h4 className="single-news-title" style={{display: 'inline-block', float: 'right'}}><i className="ion-chevron-right"></i></h4>
            </div>
          </Link>
        )
      })}
    </div>
    )
  }
})

const SettingsOptions = {
  'profile': { name: 'Profile', path: '/profile'}
};
