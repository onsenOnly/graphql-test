const graphql = require('graphql');

class Student {
   constructor(id, firstName, lastName, college) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.college = college;
   }
}

students = [new Student('id1', 'firstName1', 'lastName1', { name: 'test1' }),
new Student('id2', 'firstName2', 'lastName2', { name: 'test2' }),
new Student('id3', 'firstName3', 'lastName3', { name: 'test3' })];

const collegeType = new graphql.GraphQLObjectType({
   name: 'College',
   fields: {
      id: {
         type: graphql.GraphQLString
      },
      name: {
         type: graphql.GraphQLString
      },
      location: {
         type: graphql.GraphQLString
      },
      rating: {
         type: graphql.GraphQLFloat
      }
   }
});

const studentType = new graphql.GraphQLObjectType({
   name: 'Student',
   fields: {
      id: {
         type: graphql.GraphQLString
      },
      firstName: {
         type: graphql.GraphQLString
      },
      lastName: {
         type: graphql.GraphQLString
      },
      college: {
         type: collegeType
      }
   }
});

const queryType = new graphql.GraphQLObjectType({
   name: 'Query',
   fields: {
      students: {
         type: graphql.GraphQLList(studentType),
         resolve: () => students,
      }
   }
});

module.exports = { queryType };