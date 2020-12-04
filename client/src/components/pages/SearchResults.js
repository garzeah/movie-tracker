import React, { Component } from "react";

import SearchBar from "../SearchBar";
import omdb from "../../apis/omdb.js";
import noImg from "../../assets/images/noImg.jpg";

class SearchResults extends Component {
  state = { searchResults: {} };

  // Fetches search results from the OMDB API
  fetchSearchResults = async (mount) => {
    const searchResults = await omdb.get(
      `apikey=${process.env.REACT_APP_OMDB_KEY}`,
      {
        params: {
          s: this.props.match.params.id,
          type: "movie",
        },
      }
    );
    if (mount) {
      this.setState({ searchResults: searchResults.data.Search });
    }
  };

  componentDidMount() {
    this.mount = true;
    // Fetching search results as soon as component mounts
    this.fetchSearchResults(this.mount);
  }

  componentDidUpdate() {
    this.mount = true;
    this.fetchSearchResults(this.mount);
  }

  // componentWillUnmount() {
  //   this.mount = false;
  //   this.fetchSearchResults(this.mount);
  // }

  render() {
    // We serve a missing image picture if value is empty from API
    const imageValidation = (poster) => {
      if (poster === "N/A") {
        return noImg;
      }

      return poster;
    };

    const renderSearchResults = (searchResults) => {
      if (searchResults) {
        return Object.keys(searchResults).map((idx) => {
          return (
            <div key={idx} className="8 wide column">
              <div className="ui segment">
                <img
                  className="ui medium image"
                  src={imageValidation(searchResults[idx].Poster)}
                  alt={`Poster of ${searchResults[idx].Title}`}
                  style={{ maxHeight: "300px" }}
                />
                <div className="content">
                  <h4 className="header">{`${searchResults[idx].Title} (${searchResults[idx].Year})`}</h4>
                </div>
              </div>
            </div>
          );
        });
      } else {
        return <p>Loading...</p>;
      }
    };

    return (
      <div>
        <SearchBar />
        <div className="ui four column doubling stackable grid container">
          {renderSearchResults(this.state.searchResults)}
        </div>
      </div>
    );
  }
}

export default SearchResults;
