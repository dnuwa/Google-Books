import React, { Component } from "react";
import { UncontrolledCollapse, Button, CardBody, Card } from "reactstrap";

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
        <img
          src={book.volumeInfo.imageLinks.smallThumbnail}
          alt="Smiley face"
        />
        <h4>Author: {book.volumeInfo.authors}</h4>
        <h5>Publisher: {book.volumeInfo.publisher}</h5>
        <div>
          <a className="btn btn-sm btn-outline-secondary" id="toggler">
            click to view book description
          </a>
          <UncontrolledCollapse toggler="#toggler">
            <Card>
              <CardBody>{book.volumeInfo.description}</CardBody>
            </Card>
          </UncontrolledCollapse>
        </div>
        <p>{book.volumeInfo.publishedDate}</p>
      </div>
    ));

    return (
      <div>
        <h1 className="mt-3">Search for books</h1>
        <form class="form-inline mb-3" onSubmit={this.onSubmit}>
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
          {listedBooks}
        </div>
      </div>
    );
  }
}

export default Searchform;
