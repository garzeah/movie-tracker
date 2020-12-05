import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  state = {
    searchInput: "",
  };

  render() {
    return (
      <div
        className="ui big fluid action input"
        style={{ margin: "40px 15vh" }}
      >
        <input
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
