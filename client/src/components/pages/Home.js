import React from "react";

import MovieCategory from "../MovieCategory";

const Home = () => {
  return (
    <div>
      <MovieCategory title="Popular" category="popular" />
      <MovieCategory title="Top Rated" category="top_rated" />
    </div>
  );
};

export default Home;
