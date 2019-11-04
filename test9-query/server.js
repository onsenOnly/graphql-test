const express = require('express');
const cors = require('cors')
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

const { queryType } = require("./schema/schema");

const schema = new graphql.GraphQLSchema({ query: queryType });
const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
