import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  state = {
    searchInput: "",
  };

  render() {
    return (
      <div className="ui fluid action input" style={{ margin: "20px 300px" }}>
        <input
          onChange={(event) => {
            this.setState({ searchInput: event.target.value });
          }}
          type="text"
          placeholder="Search for a movie..."
        />
        {/* Want to take value of input and send it to searchResults w/ Redux */}
        <Link to={`/search/${this.state.searchInput}`} className="ui button">
          Search
        </Link>
      </div>
    );
  }
}

export default SearchBar;
