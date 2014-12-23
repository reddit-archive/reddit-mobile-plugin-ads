/** @jsx React.DOM */

import * as React from 'react';

var Ad = React.createClass({
  render: function() {
    return (
      <div className='listing vertical-spacing'>
        <article className='article listing well well-sm'>
          <div className='row'>
            <div className='col-xs-2 col-sm-1'>
              <a href={ this.props.linkUrl } target='_blank'>
                <img src={ this.props.thumbnail } className='listing-thumbnail' />
              </a>
            </div>
            <div className='col-xs-10 col-sm-11'>
              <header>
                <a href={ this.props.linkUrl } target='_blank'>
                  <h1 className='listing-title'>
                    { this.props.linkText }
                  </h1>
                </a>
              </header>

              <p>
                { this.props.descriptionText }
              </p>
            </div>
          </div>
          <div className='row'>
            <footer className='col-xs-12'>
              <span className='text-small pull-right'>This is an ad.</span>
            </footer>
          </div>
        </article>
      </div>
    );
  }
});

function AdFactory(app) {
  return app.mutate('ads/components/ad', Ad);
}

export default AdFactory;
