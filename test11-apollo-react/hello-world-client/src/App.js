import React, {Component} from 'react';

// apollo client
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import gql from 'graphql-tag'

const endPointUrl = 'http://localhost:4000/graphql'
const client = new ApolloClient({
   link: new HttpLink({uri:endPointUrl}),
   cache:new InMemoryCache()
});

async function loadStudentsAsync() {
   const query = gql`
   {
      students{
         id
         firstName
         lastName
         college{
            name
         }
      }
   }
   `
   const {data} = await client.query({query}) ;
   return data.students;
}
export default class  App  extends Component {
   constructor(props) {
      super(props);
      this.state = {
         students:[]
      }
      this.studentTemplate =  [];
   }
   async loadStudents() {
      const studentData =  await loadStudentsAsync();
      this.setState({
         students: studentData
      })
      console.log("loadStudents")
   }
   render() {
      return(
         <div>
            <input type = "button"  value = "loadStudents" onClick = {this.loadStudents.bind(this)}/>
            <div>
               <br/>
               <hr/>
               <table border = "3">
                  <thead>
                     <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>college Name</td>
                     </tr>
                  </thead>
                  
                  <tbody>
                     {
                        this.state.students.map(s => {
                           return (
                              <tr key = {s.id}>
                                 <td>
                                    {s.firstName}
                                 </td>
                                 <td>
                                    {s.lastName}
                                 </td>
                                 <td>
                                    {s.college.name}
                                 </td>
                              </tr>
                           )
                        })
                     }
                  </tbody>
               </table>
            </div>
         </div>
      )
   }
}