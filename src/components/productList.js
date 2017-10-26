import React from 'react';
import { connect } from 'react-redux';
import Collapse from 'react-collapse';
import {Link} from 'react-router-dom';
import ReactModal from 'react-modal'

import Orders from '../actions/orders'

export default connect()(class Component extends React.Component {
  state = {
    selectedProduct: null,
    showConfirmBox: false,
  }

  _addQuantity = (product, newQuantity) => {
    if (this.props.order.promo && !this.state.confirmed)
      this.setState({showConfirmBox: true, productId: product._id, quantity: product.quantity + newQuantity});
    else
      this.props.dispatch(Orders.addQuantity(this.props.order, product._id, product.quantity + newQuantity));
  }

  _confirm = () => {
    this.setState({showConfirmBox: false, confirmed: true});
    this.props.dispatch(Orders.addQuantity(this.props.order, this.state.productId, this.state.quantity));
  }

  _renderConfirmBox = () => {
    return (
      <ReactModal isOpen={this.state.showConfirmBox} style={{content: {paddingTop: '5px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', bottom: 'initial'}}}>
        <div className="ReactConfirmDialog">
          <div className="react-confirm-dialog-bg">
            <div className="react-confirm-dialog-content">
              <p style={{marginBottom: '20px'}}>Changing quantitities will remove any promos from this order, are you sure that you want to do this?</p>
              <button onClick={this._confirm} className="waves-effect btn primary-color waves-light" style={{zIndex: 0, float: 'right', paddingLeft: '14px', paddingRight: '14px', marginRight: 0, minWidth: '80px'}}>Ok</button>
              <button onClick={() => this.setState({showConfirmBox: false})} className="waves-effect btn waves-light" style={{zIndex: 0, color: '#76838f', backgroundColor: '#eee', float: 'right', paddingLeft: '14px', paddingRight: '14px', marginRight: '20px', minWidth: '80px'}}>Cancel</button>
            </div>
          </div>
				</div>
			</ReactModal>
    )
  }

  _renderProductModal = () => {
    return (
      <ReactModal isOpen={this.state.selectedProduct ? true : false} contentLabel="" style={{content: {paddingTop: '5px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto'}}}>
        <a href="#" onClick={(e) => {e.preventDefault(); this.setState({selectedProduct: null})}}>
          <i className="ion-android-close" style={{float: 'right', fontSize: '28px'}}></i>
          <div className="clearfix"></div>
        </a>
        {this.state.selectedProduct.imageUrl ?
          <div className="hero-header animated fadein">
            <div className="swiper-container slider m-b-20">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img src={this.state.selectedProduct.imageUrl} alt="" style={{width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}/>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div> : null}
          <div className="animated fadeinup delay-1" style={{textAlign: 'center'}}>
            <h4 className="uppercase">{this.state.selectedProduct.name}</h4>
            <h4>$ {this.state.selectedProduct.price}</h4>
            <p className="text-flow" style={{fontSize: '14px'}}>{this.state.selectedProduct.description}</p>
          </div>
      </ReactModal>
    )
  }

  render() {
    if (!this.props.order)
      return null;
    return (
      <div>
        {_.map(this.props.order.products, (product, i) => {
          return <ProductRow
            editable={this.props.editable}
            product={product}
            increment={(e) => {e.preventDefault(); this._addQuantity(product, 1)}}
            decrement={(e) => {e.preventDefault(); this._addQuantity(product, -1)}}
            select={(e) => {e.preventDefault(); this.setState({selectedProduct: product})}}
            key={i}
          />
        })}
        {this.props.order.promo ? <Row title="Promo:" amount={this.props.order.promo.type == 'amount' ? '- $' + (this.props.order.promo.value || 0).toFixed(2) : '- ' + (this.props.order.promo.value || 0) + '%'} /> : null}
        {this.props.order.shipping ? <Row title="Shipping:" amount={'$' + (this.props.order.shipping || 0).toFixed(2)} /> : null}
        <Row title="Total:" amount={'$' + (this.props.order.total || 0).toFixed(2)} />
        {this.state.selectedProduct ? this._renderProductModal() : null}
        {this.state.showConfirmBox ? this._renderConfirmBox() : null}
      </div>
    )
  }
})

const Row = (props) => (
  <div className="single-news animated fadeinright delay-2" style={{paddingTop: '10px', paddingBottom: '10px'}}>
    <h4 className="single-news-title" style={{display: 'inline-block', float: 'right', fontSize: '16px'}}>
      <span style={{marginRight: '20px'}}>{props.title}</span>{props.amount}
    </h4>
    <div className="clr">
    </div>
  </div>
)

const ProductRow = (props) => {
  return (
    <div className="single-news animated fadeinright delay-2" style={{paddingTop: '10px', paddingBottom: '10px'}}>
      <div style={{display: 'inline', float: 'left', marginRight: '10px'}}>
        <a href="#" onClick={props.select}>
          <img src={props.product.imageUrl} alt="" style={{width: '50px', height: '50px', display: 'inline'}}/>
        </a>
      </div>
      <div style={{display: 'inline'}}>
        <a href="#" onClick={props.select}>
          <h4 className="single-news-title" style={{fontSize: '16px'}}>{props.product.name}</h4>
        </a>
        <div>
          {props.editable ? <QuantityControls {...props} />: null }
          <h4 className="single-news-title" style={{display: 'inline', float: 'right', fontSize: '16px', marginTop: 0}}>
            ${((props.product.quantity) * (props.product.price || 0)).toFixed(2)}
          </h4>
          <div className="clearfix"></div>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
)
}

const QuantityControls = (props) =>
<div className="sizes" style={{display: 'inline'}}>
  <a href="#" onClick={props.decrement}>
    <span className="size" style={{padding: '2px 8px', margin: 0, borderRadius: 0}}><i className="ion-minus" style={{fontSize: '16px'}}></i></span>
  </a>
  <a href="#" onClick={(e) => {e.preventDefault(); e.stopPropagation();}}>
  <span style={{padding: '2px 8px', margin: 0, borderRadius: 0, minWidth: '40px', textAlign: 'center', borderRightWidth: 0, borderLeftWidth: 0, fontSize: '16px', borderTop: '1px solid #ddd', display: 'inline-block', borderBottom: '1px solid #ddd'}}>{props.product.quantity}</span>
  </a>
  <a href="#" onClick={props.increment}>
    <span className="size" style={{padding: '2px 8px', margin: 0, borderRadius: 0}}><i className="ion-plus" style={{fontSize: '16px'}}></i></span>
  </a>
</div>
