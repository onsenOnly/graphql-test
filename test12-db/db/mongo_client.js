const mongoose = require('mongoose');

module.exports = class MongoClient {
    constructor({ uri, options, schemas } = {}) {
        this.schemas = schemas;
        this.uri = uri;
        this.options = options;
        this.models = {};
        this.connection = null;
    }

    async connect() {
        let { uri, options } = this;
        mongoose.set('useCreateIndex', true);
        mongoose.set('bufferCommands', false);
        mongoose.set('bufferMaxEntries', 0);
        mongoose.set('autoIndex', false);
        mongoose.connection.on('error', function () {
            console.error('connection error: uri is %s,options is %s', uri, JSON.stringify(options));
        });
        mongoose.connection.once('open', function () {
            console.info('connection success', uri);
        });
        let connection = await mongoose.createConnection(uri, options);
        this.connection = connection;
        console.info('Init mongoose success');
        return connection;
    }

    getCollection(key) {
        if (this.schemas[key]) {
            if (this.models[key]) {
                return this.models[key];
            }
            let model = this.connection.model(key, this.schemas[key]);
            this.models[key] = model;
            return model;
        }
        throw new Error("illegal key");
    }
}