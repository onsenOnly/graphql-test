// var { ApolloServer, gql } = require('apollo-server');

// var typeDefs = gql
//     ` type Query { 
//         hello: String
//      } 
//      schema { 
//          query: Query 
//      }`
// ;

// var resolvers = {
//     Query: {
//         hello(root) {
//             return 'world';
//         }
//     }
// };

// const server = new ApolloServer({ typeDefs, resolvers });
// server.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
//   });


var { ApolloServer, gql } = require('apollo-server-express');

var typeDefs = gql
    ` type Query { 
        hello: String
     } 
     schema { 
         query: Query 
     }`
    ;

var resolvers = {
    Query: {
        hello(root) {
            return 'world';
        }
    }
};


const app = require('express')();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));