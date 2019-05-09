import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  }
  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });

    this.setState({
      name: '',
      genre: '',
      authorId: ''
    });
  };

  render() {
    return (
      <form onSubmit={this.submitForm} id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input
            onChange={this.handleChange}
            name="name"
            value={this.state.name}
            type="text"
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            onChange={this.handleChange}
            name="genre"
            value={this.state.genre}
            type="text"
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            onChange={this.handleChange}
            name="authorId"
            value={this.state.authorId}
          >
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
