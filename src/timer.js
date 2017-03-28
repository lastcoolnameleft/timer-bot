var config = require('./config');
console.log(config);
const storage = {};

const timer = {
    get: (name) => {
        console.log(storage[name]);
        return storage[name];
    },

    start: (name) => {
        storage[name] = {
            name,
            start_timestamp: Date.now() / 1000 | 0,
            url: config.base_url + 'api/timer/' + name,
        };
        console.log(storage[name]);
        return storage[name];
    },
    
    stop: (name) => {
        storage[name].stop_timestamp = Date.now() / 1000 | 0;
        return storage[name];
    },
};

module.exports = timer;