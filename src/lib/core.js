var util = require('util');
var request = require('request-promise');

// replace LUIS endpoint with your own
var luisEndpoint = process.env.LUIS_ENDPOINT_URL;

var luisUrlTemplate = `${luisEndpoint}&q=%s`;

var baseTimerUrl = process.env.BASE_TIMER_URL || '/api/timer/';

const timerLib = {
  getTimerRequestInfo: (action, name) => {
    console.log(`getTimerRequestInfo(${action}, ${name})`);
    if (action === 'StopTimer') {
      return {
        url: baseTimerUrl + name,
        options: {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      };
    } else if (action === 'StartTimer') {
      return {
        url: baseTimerUrl + name,
        options: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      };
    } else if (action === 'GetTimer') {
      return {
        url: baseTimerUrl + name,
        options: {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      };
    } else if (action === 'GetAllTimers') {
      return {
        url: baseTimerUrl,
        options: {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      };
    }
    throw new Error('Received unexpection action');
  },

  checkStatus: (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  },

  parseJSON: (response) => {
    return response.json();
  },

  query: (text) => {
    return new Promise((resolve, reject) => {
      var queryUrl = util.format(luisUrlTemplate, encodeURIComponent(text));
      console.log(`invoking LUIS query: ${queryUrl}`);
      return request(queryUrl)
        .then((body) => {
          var result = JSON.parse(body);
          console.log(`got LUIS response: ${JSON.stringify(body, true, 2)}`);
          return resolve(result);				
        })
        .catch(err => {
          console.error(`error: ${JSON.stringify(err, true, 2)}`);
          return reject(err);
        });
    });
  }
}

module.exports = timerLib;