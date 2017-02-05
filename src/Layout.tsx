import * as React from 'react';
import './Layout.css';

const Layout = React.createClass({
  render: function () {
    return (<div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Layout;
