import React, { Component } from "react";

import tmdb from "../../apis/tmdb.js";
import "./MoviePage.css";

class MoviePage extends Component {
  state = { movieData: null };

  // Fetches search results from the TMDB API
  fetchMovieProfile = async () => {
    const movieData = await tmdb.get(`movie/${this.props.match.params.id}`, {
      params: {
        api_key: "fb74f4c2b6ac4cd02a95209d2055a3fc",
        movie_id: this.props.match.params.id,
      },
    });
    console.log(movieData.data);
    this.setState({ movieData: movieData.data });
  };

  componentDidMount() {
    this.fetchMovieProfile();
  }

  componentDidUpdate(prevProps) {
    // If our previous route is equal to current route, do not call an AJAX request
    if (prevProps.match.params.id === this.props.match.params.id) {
      return;
    }
    this.fetchMovieProfile();
  }

  render() {
    const renderMoviePage = (movieData) => {
      if (movieData == null) {
        return;
      } // If we don't have data, tell users no results
      else if (Object.keys(movieData).length === 0) {
        return <h2 style={{ margin: "10px auto" }}>Invalid Input</h2>;
      }

      return (
        <div>
          <h1>{movieData.original_title}</h1>
          <div className="movieProfileContainer">
            <img
              className="ui medium image"
              src={
                movieData.poster_path ? (
                  `https://image.tmdb.org/t/p/w185/${movieData.poster_path}`
                ) : (
                  <p>No image</p>
                )
              }
              alt={`Poster of ${movieData.original_title}`}
            />
            <p>
              {movieData.overview
                ? movieData.overview
                : "No plot summary found."}
            </p>
          </div>
        </div>
      );
    };
    return (
      <React.Fragment>{renderMoviePage(this.state.movieData)}</React.Fragment>
    );
  }
}

export default MoviePage;
