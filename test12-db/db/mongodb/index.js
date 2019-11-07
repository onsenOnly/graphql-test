const MongoClient = require("../mongo_client");
const schemas = require("./schema");
const [uri, options] = [
    "mongodb://127.0.0.1:27017/onsen",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
    },
]

const client = new MongoClient({ uri: uri, options: options, schemas: schemas });
module.exports = client;
