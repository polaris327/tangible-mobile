import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

export default (props) => (
    <ul style={{margin: 0}}>
        <li>
          <div className="sidenav-header primary-color" style={{textAlign: 'center', paddingTop: '5px'}}>
            <img className="circle avatar" style={{height: '45px', width: '45px', marginTop: 0, marginBottom: '5px', marginLeft: 'auto', marginRight: 'auto'}} src={props.profile.imageUrl || 'https://s3.amazonaws.com/pourpal/avatars/avatar.png'} alt="" />
            <div className="avatar-body" style={{marginBottom: '10px'}}>
              {props.profile.firstName ? <p style={{fontSize: '18px', opacity: '.9'}}>{props.profile.firstName + ' ' + props.profile.lastName}</p> : null}
            </div>
          </div>
        </li>
        {_.map(menuOptions, (option, i) => {
          return (
            <li key={i}>
              <Link to={option.route} style={{lineHeight: 'inherit'}} onClick={(e) => props.close()}>
                <div className="collapsible-header" style={{backgroundColor: '#f8f8f8', fontSize: '16px', paddingTop: '5px', paddingBottom: '5px'}}><i className={option.icon} style={{fontSize: '1.5rem'}}></i> {option.name}</div>
              </Link>
            </li>
          )
        })}
        <li>
          <Link to="/logout" style={{lineHeight: 'inherit'}} onClick={(e) => props.close()}>
            <div className="collapsible-header" style={{backgroundColor: '#f8f8f8', fontSize: '16px', paddingTop: '5px', paddingBottom: '5px'}}><i className="ion-android-exit" style={{fontSize: '1.5rem'}}></i> Log out</div>
          </Link>
        </li>
      </ul>
)

const menuOptions = [
  {
    name: 'My Orders',
    icon: 'ion-paperclip',
    route: '/orders',
  },
  {
    name: 'Settings',
    icon: 'ion-android-options',
    route: '/settings',
  }
]
