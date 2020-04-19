import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Bookdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      bookId: "",
    };
  }

  componentWillMount() {
    let API_URL = `https://www.googleapis.com/books/v1/volumes`;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bookId = urlParams.get("bookId");

    fetch(`${API_URL}/${bookId}`)
      .then((res) => res.json())
      .then((data) => this.setState({ details: data.volumeInfo }));
  }

  render() {
    let bookInfo = this.state.details;

    return (
      <div className="row m-auto">
        <div>
          <button onClick={this.props.history.goBack}>Back</button>
          <hr />
        </div>
        <div className="col-12">
          <h3>Book Title</h3>
          <p>{bookInfo.title}</p>
        </div>
        <div className="col-12">
          <h3>Book Description</h3>
          <p>{bookInfo.description}</p>
        </div>
        <div className="row col-12 m-2">
          <div className="col-4">Published Date: {bookInfo.publishedDate}</div>
          <div className="col-4">Author: {bookInfo.authors}</div>
          <div className="col-4">Categories: {bookInfo.categories}</div>
        </div>
        <div className="row col-12 m-2">
          <a href="#">Book Preview</a>
        </div>
      </div>
    );
  }
}

export default withRouter(Bookdetails);
