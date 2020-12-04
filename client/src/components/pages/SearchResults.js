import React, { Component } from "react";

import SearchBar from "../SearchBar";
import MovieCard from "../MovieCard";
import tmdb from "../../apis/tmdb.js";

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
    // If our previous route is equal to current route, do not call an AJAX request
    if (prevProps.match.params.id === this.props.match.params.id) {
      return;
    }
    this.fetchSearchResults(this.props.match.params.id);
  }

  render() {
    const renderSearchResults = (searchResults) => {
      // If we don't have data, tell users no results
      if (Object.keys(searchResults).length === 0) {
        return <p>No results</p>;
      }

      // Otherwise, let's render each movie into its own card
      return Object.keys(searchResults).map((idx) => {
        return <MovieCard key={idx} movieDetail={searchResults[idx]} />;
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
