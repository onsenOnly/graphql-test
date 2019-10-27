// var express = require('express');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');
// var schema = buildSchema(`
//  type User {
//       id: String 
//       name: String 
//     } 
//     type Query {
//          user(id: String): User 
//         } `
// );
// // Maps id to User object
// var fakeDatabase = {
//     'a': {
//         id: 'a',
//         name: 'alice',
//     },
//     'b': {
//         id: 'b',
//         name: 'bob',
//     },
// };
// var root = {
//     user: function ({ id }) {
//         return fakeDatabase[id];
//     }
// };
// var app = express();
// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
// }));
// app.listen(4000);
// console.log('Running a GraphQL API server at localhost:4000/graphql');

var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
// Maps id to User object
var fakeDatabase = {
    'a': {
        id: 'a',
        name: 'alice',
    },
    'b': {
        id: 'b',
        name: 'bob',
    },
};
// Define the User type
var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: graphql.GraphQLString
        },
        name: {
            type: graphql.GraphQLString
        },
    }
});
// Define the Query type
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            // `args` describes the arguments that the `user` query accepts 
            args: {
                id: {
                    type: graphql.GraphQLString
                }
            },
            resolve: function (_, { id }) {
                return fakeDatabase[id];
            }
        }
    }
});

var schema = new graphql.GraphQLSchema({ query: queryType });
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');