// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import Clock from 'react-clock';
import moment from 'moment';

import './style.css';
import timerLib from '../../lib/core.js';
const findTimerUrl = `/api/timer/`;

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.params.name,
      buttonLabel: 'StartTimer',
      duration: '',
      url: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.fetchTimer = this.fetchTimer.bind(this);
    this.fetchTimer(this, this.state.name);
  }

  handleFech(data) {
    this.setState({ name: data.name });
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
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

    fetch(url, timerLib.getTimerRequestInfo('GetTimer', name))
      .then(timerLib.checkStatus)
      .then(timerLib.parseJSON)
      .then((data) => {
        if (!data) {
          console.log('Could not find timer.');
          self.setState({
            name: '',
            buttonLabel: 'StartTimer',
            duration: '',
            start: '',
            stop: '',
            url: '',
          });
        } else {
          console.log('Found existing timer.');
          const start = moment.unix(data.start_timestamp).toISOString();
          const stop = data.stop_timestamp ? moment.unix(data.stop_timestamp).toISOString() : '';
          const duration = data.start_timestamp && data.stop_timestamp
            ? moment.duration(data.stop_timestamp - data.start_timestamp, "seconds").humanize(true) : '';
          self.setState({
            name: data.name,
            buttonLabel: 'StopTimer',
            duration,
            start,
            stop,
            url,
          });

        }
      })
      .catch((error) => {
        console.log('request failed', error)
      });
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classnames('NotFound', className)} >
        <div>
            Current Time: <Clock />
        </div>
        <div>
          <table>
            <tbody>
              <tr><td>Timer Name:</td>
                  <td><input type="text" value={this.state.name} onChange={this.handleNameChange} /></td></tr>
              <tr><td>Start Time:</td><td>{this.state.start}</td></tr>
              <tr><td>Stop Time:</td><td>{this.state.stop}</td></tr>
              <tr><td>Duration:</td><td>{this.state.duration}</td></tr>
              <tr><td>URL:</td><td>{this.state.url}</td></tr>
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
}
