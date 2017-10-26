import React from 'react';
import ReactDOM from 'react-dom';

export default class Component extends React.Component {
  render() => null
  portalElement: null,
  componentDidMount() {
    var portal = document.createElement('div');
        document.body.appendChild(portal);
    this.portalElement = portal;
    this.componentDidUpdate();
  }
  componentWillUnmount() {
    document.body.removeChild(this.portalElement);
  }
  componentDidUpdate() {
    ReactDOM.render(<div {...this.props}>{this.props.children}</div>, this.portalElement);
  }
};
