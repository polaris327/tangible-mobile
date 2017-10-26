import React from 'react';
import {Link} from 'react-router-dom';

export default () =>
      <div id="content" className="page-404 grey-blue">
        <div className="animated fadeinup">
          <div className="valign-wrapper fullscreen">
            <div className="valign" style={{marginLeft: 'auto', marginRight: 'auto'}} >
              <div className="row">
                <div className="col s12 center-align">
                  <h1 className="title">404</h1>
                </div>
                <div className="col s12 center-align p-20">
                  <div className="card-panel animated fadein delay-2">
                    <h2>Oops!</h2>
                    <span>The page you're looking for was not found.<br />
                      <a className="accent-text" href="/"><i className="ion-android-home"></i></a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
