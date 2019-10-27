// var express = require('express');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');
// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(` 
//     input MessageInput { 
//         content: String 
//         author: String 
//     } 
//     type Message {
//         id: ID! 
//         content: String 
//         author: String 
//     } 
//     type Query {
//         getMessage(id: ID!): Message 
//     } 
//     type Mutation { 
//         createMessage(input: MessageInput): Message 
//         updateMessage(id: ID!, input: MessageInput): Message 
//     } 
// `
// );
// // If Message had any complex fields, we'd put them on this object.
// class Message {
//     constructor(id, { content, author }) {
//         this.id = id;
//         this.content = content;
//         this.author = author;
//     }
// }
// // Maps username to content
// var fakeDatabase = {};
// var root = {
//     getMessage: function ({ id }) {
//         if (!fakeDatabase[id]) {
//             throw new Error('no message exists with id ' + id);
//         }
//         return new Message(id, fakeDatabase[id]);
//     },
//     createMessage: function ({ input }) {
//         // Create a random id for our "database".
//         var id = require('crypto').randomBytes(10).toString('hex');
//         fakeDatabase[id] = input;
//         return new Message(id, input);
//     },
//     updateMessage: function ({ id, input }) {
//         if (!fakeDatabase[id]) {
//             throw new Error('no message exists with id ' + id);
//         }
//         // This replaces all old data, but some apps might want partial update. 
//         fakeDatabase[id] = input;
//         return new Message(id, input);
//     },
// };
// var app = express();
// app.use('/graphql', graphqlHTTP({ schema: schema, rootValue: root, graphiql: true, }));
// app.listen(4000, () => { console.log('Running a GraphQL API server at localhost:4000/graphql'); });

var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
// Maps id to User object
var fakeDatabase = {};
// Define the User type

class Message {
    constructor(id, { content, author }) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}

var messageType = new graphql.GraphQLObjectType({
    name: 'Message',
    fields: {
        id: {
            type: graphql.GraphQLString
        },
        author: {
            type: graphql.GraphQLString
        },
        content: {
            type: graphql.GraphQLString
        },
    }
});

var messageInputType = new graphql.GraphQLInputObjectType({
    name: 'MessageInput',
    fields: {
        id: {
            type: graphql.GraphQLString
        },
        author: {
            type: graphql.GraphQLString
        },
        content: {
            type: graphql.GraphQLString
        },
    }
});

// Define the Query type
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        getMessage: {
            type: messageType,
            args: {
                id: {
                    type: graphql.GraphQLString
                }
            },
            resolve: function (_, { id }) {
                if (!fakeDatabase[id]) {
                    throw new Error('no message exists with id ' + id);
                }
                return new Message(id, fakeDatabase[id]);
            }
        }
    }
});

var mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createMessage: {
            type: messageType,
            args: {
                input: {
                    type: messageInputType
                }
            },
            resolve: function (_, { input }) {
                var id = require('crypto').randomBytes(10).toString('hex');
                fakeDatabase[id] = input;
                return new Message(id, input);
            }
        },
        updateMessage: {
            type: messageType,
            args: {
                id: {
                    type: graphql.GraphQLString
                },
                input: {
                    type: messageInputType
                }
            },
            resolve: function (_, { id, input }) {
                if (!fakeDatabase[id]) {
                    throw new Error('no message exists with id ' + id);
                }
                // This replaces all old data, but some apps might want partial update. 
                fakeDatabase[id] = input;
                return new Message(id, input);
            }
        }
    }
});

var schema = new graphql.GraphQLSchema({ query: queryType, mutation: mutationType });
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
