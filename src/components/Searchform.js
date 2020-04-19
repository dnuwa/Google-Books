import React, { Component } from "react";
import { Link } from "react-router-dom";

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

  componentWillMount() {
    let API_URL = `https://www.googleapis.com/books/v1/volumes`;

    fetch(`${API_URL}?q=software`)
      .then((res) => res.json())
      .then((data) => this.setState({ books: data.items }));
  }

  render() {
    const listedBooks = this.state.books.map((book) => (
      <div className="book-card" key={book.id}>
        <h3>{book.volumeInfo.title}</h3>
        <img
          src={book.volumeInfo.imageLinks.smallThumbnail}
          alt="Smiley face"
        />
        <h4>Author: {book.volumeInfo.authors}</h4>
        <h5>Publisher: {book.volumeInfo.publisher}</h5>
        <p>{book.volumeInfo.publishedDate}</p>
        <div className="pb-3">
          <Link
            className="btn btn-small btn-outline-secondary"
            to={`/book/?bookId=${book.id}`}
          >
            more information
          </Link>
        </div>
      </div>
    ));

    return (
      <div>
        <h1 className="mt-3">Search for books</h1>
        <form className="form-inline mb-3" onSubmit={this.onSubmit}>
          <input
            className="col-10 form-control"
            type="text"
            name="search"
            id="search"
            onChange={this.onChange}
            value={this.setState.searchText}
            required
          />
          <button className="col-2 btn btn-primary" type="submit">
            Search
          </button>
        </form>
        <div>
          <h3> Books List</h3>
          <hr />

          <div className="row">{listedBooks}</div>
        </div>
      </div>
    );
  }
}

export default Searchform;
