// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import { Chat } from 'botframework-webchat';

import './style.css';

export default class Bot extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className } = this.props;
    return (
      <div className={classnames('Bot', className)} >
        <Chat directLine={{ secret: 'ugNPVWsQRV8.cwA.C1k.UHWXNwPVMx7hVZo7Zbem9_A8xhDy5SpHO1YBfX7eXjk' }} user={{ id: 'fooid', name: 'fooname' }}/>
      </div>
    );
  }
}
