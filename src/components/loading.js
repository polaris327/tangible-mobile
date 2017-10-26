import React from 'react';
import MDSpinner from "react-md-spinner";

export default (props) => {
  return (
    <div style={{textAlign: 'center', marginTop: props.top ? props.top : 0}}>
      <MDSpinner singleColor="#2196F3" size={props.size || 28} duration={1800} />
      {props.message ? <h4 style={{marginTop: '20px'}}>{props.message}</h4> : null }
    </div>
  )
}
