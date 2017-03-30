// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import { Chat } from 'botframework-webchat';

import './style.css';

export default class Bot extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={classnames('Bot', className)} >
        <Chat directLine={{ secret: 'xxx' }} user={{ id: 'userid', name: 'username' }}/>
      </div>
    );
  }
}
