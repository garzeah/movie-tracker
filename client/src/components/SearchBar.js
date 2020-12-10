import React, { Component } from "react";
import { Link } from "react-router-dom";

import history from "../history";

class SearchBar extends Component {
  state = {
    searchInput: "",
  };

  // If enter key is press, we route the user to their search results
  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      history.push(`/search/${this.state.searchInput}`);
    }
  };

  render() {
    return (
      <div
        className="ui big fluid action input"
        style={{ margin: "40px 40px" }}
      >
        <input
          onKeyDown={(e) => {
            this.handleKeyDown(e);
          }}
          onChange={(event) => {
            this.setState({ searchInput: event.target.value });
          }}
          type="text"
          placeholder="Search for a movie..."
        />
        <Link to={`/search/${this.state.searchInput}`} className="ui button">
          Search
        </Link>
      </div>
    );
  }
}

export default SearchBar;
