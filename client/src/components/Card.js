import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="ui card">
        <a className="image" href="#">
          <img src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" />
        </a>
        <div className="content">
          <a class="header" href="#">
            Interstellar
          </a>
        </div>
      </div>
    );
  }
}

export default Card;
