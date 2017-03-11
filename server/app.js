// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const builder = require('botbuilder');

const app = express();
app.use(cors());

const timer = require('./timer');

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.delete('/api/timer/:name', (req, res) => {
  res.send(JSON.stringify(timer.stop(req.params.name)));
});

app.post('/api/timer/:name', (req, res) => {
  res.send(JSON.stringify(timer.start(req.params.name)));
});

app.get('/api/timer/:name', (req, res) => {
  res.send(JSON.stringify(timer.get(req.params.name)));
});

// MSFT Bot Connector
var dialogs = require('./bot/dialogs');

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);

dialogs.bind(bot);
app.post('/api/messages', connector.listen());


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
