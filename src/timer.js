const storage = {};

const timer = {
    get: (name) => {
        return storage[name];
    },

    start: (name) => {
        storage[name] = {
            name,
            start_timestamp: Date.now() / 1000 | 0,
            url: '/api/timer/' + name,
        };
        return storage[name];
    },
    
    stop: (name) => {
        storage[name].stop_timestamp = Date.now() / 1000 | 0;
        return storage[name];
    },
};

module.exports = timer;