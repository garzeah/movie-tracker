import React from "react";
import { Link } from "react-router-dom";

import "./MovieCard.css";
import noImg from "../assets/images/noImg.png";

const MovieCard = ({ movieDetail, idx }) => {
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
    <div key={idx} className="column">
      <Link to={`/movie/${movieDetail.id}`}>
        <div className={`${"ui segment"} ${"movieCard"}`}>
          <img
            className="ui medium rounded image"
            style={{ margin: "0 auto" }}
            src={
              movieDetail.poster_path
                ? `https://image.tmdb.org/t/p/w185/${movieDetail.poster_path}`
                : noImg
            }
            alt={`Poster of ${movieDetail.original_title}`}
          />
        </div>
        <div className="content">
          <h3
            className="header"
            style={{
              marginTop: "5px",
              textAlign: "center",
              fontSize: "2vh",
            }}
          >
            {`${movieDetail.original_title} (${movieYearValidation(
              movieDetail.release_date
            )})`}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
