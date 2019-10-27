var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
// Construct a schema, using GraphQL schema language
var schema = buildSchema(` 
    type objName {
        name:String
    }
    type Query {
        hello:objName
    }
`);
// The root provides the top-level API endpoints
var root = {
    hello: () => { return { name: 'hello world' } },
}
var app = express();
app.use('/graphql', graphqlHTTP({ schema: schema, rootValue: root, graphiql: true, }));
app.listen(4000); console.log('Running a GraphQL API server at localhost:4000/graphql');