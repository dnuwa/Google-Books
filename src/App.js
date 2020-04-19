import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Search from "./components/Searchform";
import Details from "./components/Bookdetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Route
          exact
          path="/"
          render={(props) => (
            <React.Fragment>
              <Search />
            </React.Fragment>
          )}
        />
        <Route path="/book" component={Details} />
      </div>
    </Router>
  );
}

export default App;
