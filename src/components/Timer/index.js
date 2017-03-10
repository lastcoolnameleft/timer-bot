// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';

export default class Timer extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    console.log(this.props);
    const { className, ...props } = this.props;
    console.log(props);
    return (
      <div className={classnames('Timer', className)} >
        <h1>
         Timer { props.params.name }
        </h1>
      </div>
    );
  }
}
