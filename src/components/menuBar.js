import React from 'react';
import { connect } from 'react-redux';
import Collapse from 'react-collapse';
import Menu from './menu'

export default connect(mapStateToProps)(class Component extends React.Component {
  state = {open: false}

  render() {
    return (
      <div>
      <div id="toolbar" className="primary-color" style={{position: 'inherit', zIndex: 'inherit', top: 'inherit', left: 'inherit', right: 'inherit'}}>
        <div className="open-left" id="open-left" data-activates="slide-out-left" onClick={(e) => {e.preventDefault(); this.setState({open: !this.state.open})}}>
          <i className="ion-android-menu"></i>
        </div>
        <span className="title" style={{display: 'block', textAlign: 'center', marginLeft: 0, marginRight: '56px'}}>{this.props.title}</span>
      </div>
      <Collapse isOpened={this.state.open} style={{backgroundColor: '#FFFFFF'}}>
        <Menu close={() => this.setState({open: false})} {...this.props} />
      </Collapse>
      </div>
    )
  }
})

function mapStateToProps(state, ownProps) {
  return {
    title: state.app.menuTitle || ownProps.title,
    profile: state.user.profile || {},
  }
}
