const graphql = require('graphql');
const queryType = new graphql.GraphQLObjectType({
   name: 'Query',
   fields: {
      greeting: {
         type: graphql.GraphQLString,
         resolve: () => 'Hello GraphQL  From TutorialsPoint !!',
      },
      sayHello: {
         type: graphql.GraphQLString,
         args: {
            name: {
               type: graphql.GraphQLString
            }
         },
         resolve: function (_, args) {
            return `Hi ${args.name} GraphQL server says Hello to you!!`
         }
      }
   }
});

module.exports = { queryType };