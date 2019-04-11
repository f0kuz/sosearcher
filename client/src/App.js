import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import {GetIssues} from "./components/GetIssues";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  state = {
    phrase: null,
  };

  onSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
    this.setState({
      phrase: e.target.value
    })
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <form onSubmit={this.onSubmit}>
            <input type="text" onChange={this.handleChange} />
            <button type="submit">Search</button>
          </form>
          <GetIssues phrase={this.state.phrase} />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
