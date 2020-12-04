import React, { Component } from "react";

import SearchBar from "../SearchBar";
import tmdb from "../../apis/tmdb.js";
import noImg from "../../assets/images/noImg.jpg";

class SearchResults extends Component {
  state = { searchResults: {} };

  // Fetches search results from the tMDB API
  fetchSearchResults = async () => {
    const searchResults = await tmdb.get(
      "search/movie?api_key=fb74f4c2b6ac4cd02a95209d2055a3fc",
      {
        params: {
          query: this.props.match.params.id,
          language: "en-US",
        },
      }
    );
    console.log(searchResults.data.results);
    // if (mount) {
    this.setState({ searchResults: searchResults.data.results });
    // }
  };

  componentDidMount() {
    // this.mount = true;
    // Fetching search results as soon as component mounts
    this.fetchSearchResults();
  }

  componentDidUpdate() {
    // this.mount = true;
    this.fetchSearchResults();
  }

  // componentWillUnmount() {
  //   this.mount = false;
  //   this.fetchSearchResults(this.mount);
  // }

  render() {
    // Returns only the year of the date sent in
    const movieYearValidation = (date) => {
      if (date) {
        date = date.split("-");
        let dateYear = date[0];
        return dateYear;
      }

      return "N/A";
    };

    const renderSearchResults = (searchResults) => {
      if (searchResults) {
        return Object.keys(searchResults).map((idx) => {
          return (
            <div key={idx} className="8 wide column">
              <div className="ui segment">
                <img
                  className="ui medium image"
                  src={
                    searchResults[idx].poster_path
                      ? `https://image.tmdb.org/t/p/w185/${searchResults[idx].poster_path}`
                      : noImg
                  }
                  alt={`Poster of ${searchResults[idx].original_title}`}
                  style={{ maxHeight: "300px" }}
                />
                <div className="content">
                  <h4 className="header">{`${
                    searchResults[idx].original_title
                  } (${movieYearValidation(
                    searchResults[idx].release_date
                  )})`}</h4>
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
