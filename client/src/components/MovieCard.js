import React, { Component } from "react";

import noImg from "../assets/images/noImg.jpg";

class MovieCard extends Component {
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
    return (
      <div key={this.props.idx} className="8 wide column">
        <div className="ui segment">
          <img
            className="ui medium image"
            src={
              this.props.movieDetail.poster_path
                ? `https://image.tmdb.org/t/p/w185/${this.props.movieDetail.poster_path}`
                : noImg
            }
            alt={`Poster of ${this.props.movieDetail.original_title}`}
            style={{ maxHeight: "300px" }}
          />
          <div className="content">
            <h3 className="header" style={{ marginTop: "5px" }}>{`${
              this.props.movieDetail.original_title
            } (${movieYearValidation(
              this.props.movieDetail.release_date
            )})`}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
