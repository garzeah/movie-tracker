import React, { Component } from "react";

import tmdb from "../../apis/tmdb.js";
import noImg from "../../assets/images/noImg.png";
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
    // console.log(movieData.data);
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
    const inputValidation = (input) => {
      if (input == null) {
        return "N/A";
      }

      return input;
    };

    // Gets the value of each object in an array and returns it in a new array
    const processArray = (arr) => {
      if (arr === undefined || arr.length === 0) {
        return "N/A";
      }

      let processedArray = [];
      arr.map((el, idx) => {
        processedArray[idx] = el.name;
      });
      return processedArray.join(", ");
    };

    const renderMoviePage = (movieData) => {
      if (movieData == null) {
        return;
      } // If we don't have data, tell users no results
      else if (Object.keys(movieData).length === 0) {
        return <h2 style={{ margin: "10px auto" }}>Invalid Input</h2>;
      }

      return (
        <div className="moviePageContainer">
          <h1>{movieData.original_title}</h1>
          <div className="movieHeader">
            <div className="ui segment" style={{ margin: "0 auto" }}>
              <img
                style={{ margin: "0 auto" }}
                className="ui image"
                src={
                  movieData.poster_path
                    ? `https://image.tmdb.org/t/p/w185/${movieData.poster_path}`
                    : noImg
                }
                alt={`Poster of ${movieData.original_title}`}
              />
            </div>
            <div className="overview">
              <h2>Overview</h2>
              <p>
                {movieData.overview
                  ? movieData.overview
                  : "No plot summary found."}
              </p>
            </div>
          </div>

          <h1 className="headerDetails">Details</h1>
          <div className="movieDetails">
            <h4>Genre(s)</h4>
            <p>{processArray(movieData.genres)}</p>
            <h4>Status</h4>
            <p>{inputValidation(movieData.status)}</p>
            <h4>Release Date</h4>
            <p>{inputValidation(movieData.release_date)}</p>
            <h4>Runtime</h4>
            <p>{`${inputValidation(movieData.runtime)} minutes`}</p>
            <h4>Production Companies</h4>
            <p>{processArray(movieData.production_companies)}</p>
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
