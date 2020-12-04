import React, { Component } from "react";

import SearchBar from "../SearchBar";
import tmdb from "../../apis/tmdb.js";
import noImg from "../../assets/images/noImg.jpg";

class SearchResults extends Component {
  state = { searchResults: {} };

  // Fetches search results from the TMDB API
  fetchSearchResults = async (userInput) => {
    const searchResults = await tmdb.get(
      "search/movie?api_key=fb74f4c2b6ac4cd02a95209d2055a3fc",
      {
        params: {
          query: userInput,
          language: "en-US",
        },
      }
    );
    this.setState({ searchResults: searchResults.data.results });
  };

  componentDidMount() {
    this.fetchSearchResults(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    // If our previous route is equal to current route, do not
    // call an AJAX request
    if (prevProps.match.params.id === this.props.match.params.id) {
      return;
    }
    this.fetchSearchResults(this.props.match.params.id);
  }

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

    // The structure of each movie in search results
    const movieCard = (searchResults, idx) => (
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
            } (${movieYearValidation(searchResults[idx].release_date)})`}</h4>
          </div>
        </div>
      </div>
    );

    const renderSearchResults = (searchResults) => {
      // If we don't have data, tell users no results
      if (Object.keys(searchResults).length === 0) {
        return <p>No results</p>;
      }

      // Otherwise, let's render each movie into its own card
      return Object.keys(searchResults).map((idx) => {
        return movieCard(searchResults, idx);
      });
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
