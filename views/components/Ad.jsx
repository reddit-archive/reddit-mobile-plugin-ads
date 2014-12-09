/** @jsx React.DOM */

import * as React from 'react';

var Ad = React.createClass({
  render: function() {
    return (
      <div className='well-sm ad'>
        <a href='/ad'>
          <p>Look I'm an ad</p>
        </a>
      </div>
    );
  }
});

function AdFactory(app) {
  Vote = VoteFactory(app);

  return app.mutate('ads/components/ad', Ad);
}

export default AdFactory;
