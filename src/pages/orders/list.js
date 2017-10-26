import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import Orders from '../../actions/orders';

export default connect(mapStateToProps)(class Component extends React.Component {
  componentDidMount() {
    this.props.dispatch(Orders.getAll({userId: this.props.userId}));
  }

  render() {
  return (
    <div id="content" className="page">
      {_.map(this.props.orders, (order, i) => {
        return (
          <Link to={'/orders/' + order._id} key={i}>
            <div className="single-news animated fadeinright delay-2" style={{backgroundColor: '#FFFFFF', padding: '10px 20px 10px 20px'}}>
              <h4 className="single-news-title" style={{display: 'inline-block'}}>Order on {moment(order.createdAt).format('M/D/YY')}</h4>
              <h4 className="single-news-title" style={{display: 'inline-block', float: 'right'}}>${order.total}</h4>
            </div>
          </Link>
        )
      })}
    </div>
  )
  }
})

function mapStateToProps(state) {
  return {
    orders: _.chain(state.orders)
             .sortBy('createdAt')
             .reverse()
             .value(),
    userId: state.user._id
  }
}

const SettingsOptions = {
  'profile': { name: 'Profile', path: '/profile'}
};
