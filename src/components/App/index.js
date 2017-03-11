// src/components/App/index.js
//import React, { PropTypes, Component } from 'react';
import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';

class App extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className } = this.props;
    return (
      <div className={classnames('App', className)}>
        <div className="App-header">
          <h2>Welcome to Uber-Timer</h2>
        </div>
        <p className="App-intro">
            <a href='/timer/sample'>Create Timer</a>
        </p>
      </div>
    );
  }
}

export default App;
