import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

async function loadGreeting() {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: '{greeting}' })
  })
  const rsponseBody = await response.json();
  return rsponseBody.data.greeting;
  console.log("end of function")
}

async function loadSayhello(name) {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: `{sayHello(name:"${name}")}` })
  })
  const rsponseBody = await response.json();
  return rsponseBody.data.sayHello;
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { greetingMessage: '', sayHelloMessage: '', userName: '' }
    this.updateName = this.updateName.bind(this);
    this.showSayHelloMessage = this.showSayHelloMessage.bind(this);
    this.showGreeting = this.showGreeting.bind(this);
  }

  showGreeting() {
    loadGreeting().then(g => this.setState({ greetingMessage: g + " :-)" }))
  }

  showSayHelloMessage() {
    const name = this.state.userName;
    console.log(name)
    loadSayhello(name).then(m => this.setState({ sayHelloMessage: m }))
  }

  updateName(event) {
    this.setState({ userName: event.target.value })
  }

  componentDidMount() {
    this.showGreeting();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
        <br />
        <section>
          showGreeting:{this.state.greetingMessage}
        </section>
        <br />
        <section>
          Enter a name:<input id="txtName" type="text" onChange={this.updateName}
            value={this.state.userName} />
          <button id="btnSayhello" onClick={this.showSayHelloMessage}>SayHello</button>
          <br />
          user name is:{this.state.userName}    <br />
          <div id="SayhelloDiv">
            <h1>{this.state.sayHelloMessage}</h1>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
