import React, { Component } from "react";

import SearchBar from "../SearchBar";
import MovieList from "../MovieList";
import tmdb from "../../apis/tmdb.js";
import key from "../../apis/apiKey.js";

class SearchResults extends Component {
  state = { searchResults: null };

  // Fetches search results from the TMDB API
  fetchSearchResults = async (userInput) => {
    const searchResults = await tmdb.get("search/movie", {
      params: {
        api_key: key,
        query: userInput,
      },
    });
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
    return (
      <div>
        <SearchBar />
        <div className="ui four column doubling stackable grid container">
          <MovieList moviesData={this.state.searchResults} />
        </div>
      </div>
    );
  }
}

export default SearchResults;
