import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;

class App extends Component {

  render() {
    return (
      <div>
        This is first dialog.
      </div>
    )
  }
}

export default App;
