const graphql = require('graphql');
const mongodb = require("../db").mongodb;
const mysql = require("../db").mysql;

const ArticleType = new graphql.GraphQLObjectType({
   name: 'Article',
   fields: {
      _id: {
         type: graphql.GraphQLString
      },
      title: {
         type: graphql.GraphQLString
      },
      source: {
         type: graphql.GraphQLString
      },
   }
});

const OrderType = new graphql.GraphQLObjectType({
   name: 'Order',
   fields: {
      orderNumber: {
         type: graphql.GraphQLInt
      },
      status: {
         type: graphql.GraphQLString
      },
      comments: {
         type: graphql.GraphQLString
      },
   }
});

const queryType = new graphql.GraphQLObjectType({
   name: 'Query',
   fields: {
      articles: {
         type: graphql.GraphQLList(ArticleType),
         resolve: async () => await mongodb.getCollection('Article').find({}),
      },
      orders: {
         type: graphql.GraphQLList(OrderType),
         args: {
            page: {
               type: graphql.GraphQLInt
            },
            pageSize: {
               type: graphql.GraphQLInt
            },
         },
         resolve: async (_, { page = 0, pageSize = 10 }) => await mysql.doQuery(`
             SELECT  * FROM orders limit ${((page - 1) < 0 ? 0 : (page - 1)) * pageSize},${pageSize};
         `),
      }
   }
});



module.exports = { queryType };