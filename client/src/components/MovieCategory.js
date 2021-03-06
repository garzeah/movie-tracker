import React, { Component } from "react";

import MovieList from "./MovieList";
import tmdb from "../apis/tmdb.js";

class MovieCategory extends Component {
  state = { categoryResults: null };

  fetchCategoryResults = async () => {
    const categoryResults = await tmdb.get(`/movie/${this.props.category}`, {
      params: {
        api_key: "fb74f4c2b6ac4cd02a95209d2055a3fc",
      },
    });
    this.setState({
      categoryResults: categoryResults.data.results.splice(0, 5),
    });
  };

  componentDidMount() {
    this.fetchCategoryResults();
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            margin: "30px auto 20px auto",
            fontFamily: "verdana",
          }}
        >
          {this.props.title}
        </h1>
        <div
          className="ui five column stackable grid"
          style={{ margin: "0 20px" }}
        >
          <MovieList moviesData={this.state.categoryResults} />
        </div>
      </div>
    );
  }
}

export default MovieCategory;
