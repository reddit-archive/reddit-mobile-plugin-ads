/** @jsx React.DOM */

import React from 'react';

class Ad extends React.Component {
  render () {
    if (!this.props.linkUrl) {
      return (<div />);
    }

    return (
      <div className='listing vertical-spacing'>
        <article className='article listing well well-sm'>
          <div className='row'>
            <div className='col-xs-2 col-sm-1'>
              <a href={ this.props.linkUrl } target='_blank'>
                <img src={ this.props.thumbnail } className='img-responsive' />
              </a>
            </div>
            <div className='col-xs-10 col-sm-11'>
              <header>
                <a href={ this.props.linkUrl } target='_blank'>
                  <h1 className='h4'>
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
};

function AdFactory(app) {
  return app.mutate('ads/components/ad', Ad);
}

export default AdFactory;
