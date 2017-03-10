// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import Clock from 'react-clock';
import moment from 'moment';

import './style.css';
import timerLib from '../../lib/core.js';
const baseTimerUrl = 'http://localhost:9000/api/';
//const getTimerUrl = `${baseTimerUrl}timer/get`;
const findTimerUrl = `${baseTimerUrl}timer/`;

export default class Timer extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      name: this.props.params.name,
      buttonLabel: 'StartTimer',
      ago: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.fetchTimer = this.fetchTimer.bind(this);
    this.fetchTimer(this, this.state.name);
  }

  handleFech(data) {
    this.setState({ name: data.name });
  }

  handleClick = () => {
    const timerRequestInfo = timerLib.getTimerRequestInfo(this.state.buttonLabel, this.state.name);
    console.log(timerRequestInfo);
    fetch(timerRequestInfo.url, timerRequestInfo.options)
      .then(timerLib.checkStatus)
      .then(() => {
        this.fetchTimer(this, this.state.name);
      })
      .catch((error) => {
        console.log('request failed', error)
      });

    event.preventDefault();
  }

  fetchTimer(self, name) {
    const url = findTimerUrl + name;
    console.log(`fetching ${url}`);
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    };

    fetch(url, options)
      .then(timerLib.checkStatus)
      .then(timerLib.parseJSON)
      .then((data) => {
        if (!data) {
          console.log('Could not find timer.');
          self.setState({
            name: '',
            buttonLabel: 'StartTimer',
            ago: '',
            start: '',
          });
        } else {
          const start_timestamp = data.start_timestamp;
          console.log('Found existing timer.' + start_timestamp);
          const ago = moment.unix(start_timestamp).fromNow();
          const start = moment.unix(start_timestamp).toISOString();
          self.setState({
            name: data.name,
            buttonLabel: 'StopTimer',
            ago,
            start,
          });

        }
      })
      .catch((error) => {
        console.log('request failed', error)
      });
  }

  render() {
    //const { className, ...props } = this.props;
    const { className } = this.props;

    return (
      <div className={classnames('NotFound', className)} >
        <div>
            Current Time: <Clock />
        </div>
        <div>
          <table>
            <tbody>
              <tr><td>Timer Name:</td><td>{this.state.name}</td></tr>
              <tr><td>Start Time:</td><td>{this.state.start}</td></tr>
              <tr><td>Ago:</td><td>{this.state.ago}</td></tr>
            </tbody>
          </table>
          <br />
          <button onClick={this.handleClick}>{this.state.buttonLabel}</button>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
  
/*
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
  */
}
