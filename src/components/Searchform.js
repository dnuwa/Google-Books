import React, { Component } from "react";

class Searchform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const searchText = {
      text: this.state.search,
    };

    let API_URL = `https://www.googleapis.com/books/v1/volumes`;

    fetch(`${API_URL}?q=${searchText.text}`)
      .then((res) => res.json())
      .then((data) => this.setState({ books: data.items }));
  };

  render() {
    const listedBooks = this.state.books.map((book) => (
      <div key={book.id}>
        <h3>{book.volumeInfo.title}</h3>
        <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Smiley face"/>
        <h3>Author: {book.volumeInfo.authors}</h3>
        <h4>Publisher: {book.volumeInfo.publisher}</h4>
        <p>{book.volumeInfo.description}</p>
        <p>{book.volumeInfo.publishedDate}</p>
      </div>
    ));

    return (
      <div>
        <h1>Search for books</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            onChange={this.onChange}
            value={this.setState.searchText}
          />
          <button type="submit">Search</button>
        </form>
        <div>
          <h1> Books List</h1>
          <hr />
          {listedBooks}
        </div>
      </div>
    );
  }
}

export default Searchform;
