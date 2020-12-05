import React from "react";

import MovieCard from "./MovieCard";

const MovieList = ({ moviesData }) => {
  const renderMovies = (moviesData) => {
    if (moviesData == null) {
      return;
    } // If we don't have data, tell users no results
    else if (Object.keys(moviesData).length === 0) {
      return <h2 style={{ margin: "10px auto" }}>Invalid Input</h2>;
    }

    // Otherwise, let's render each movie into its own card
    return Object.keys(moviesData).map((idx) => {
      return <MovieCard key={idx} movieDetail={moviesData[idx]} />;
    });
  };

  return <React.Fragment>{renderMovies(moviesData)}</React.Fragment>;
};

export default MovieList;
