import React from 'react';

export default (props) =>
  <div style={props.style}>
        <ul id="progressbar" style={{ margin: 0 }}>
          {_.map(props.steps, (step, i) => {
            if (i <= props.position)
              return (
                <li key={i} className={i <= props.position ? 'active' : null} style={{width: (1 / props.steps.length * 100) + '%'}}>
                  <a href="#" onClick={(e) => props.onClick(i)}>{step.name}</a>
                </li>
              )
            else
              return (
                <li key={i} className={i <= props.position ? 'active' : null} style={{width: (1 / props.steps.length * 100)  + '%'}}>
                  {step.name}
                </li>
              )
          })}
      	</ul>
  </div>
