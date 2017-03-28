var request = require('request-promise');
var util = require('util');
var config = require('../config.js');

// replace LUIS endpoint with your own
var luisEndpoint = config.luis_url;
var luisUrlTemplate = `${luisEndpoint}&q=%s`;

function query(text) {
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

module.exports = {
	query
};

