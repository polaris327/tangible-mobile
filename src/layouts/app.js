import React from 'react';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import MenuBar from '../components/menuBar';
import Store from '../config/store';

export default (ComposedComponent, title) => (props) =>
  <div style={{maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto'}}>
    <MenuBar title={title} />
    <ComposedComponent {...props} />
  </div>

const sidebarStyles = {
  sidebar: {
    width: '300px',
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto',
    boxShadow: 'inherit',
  },
}
