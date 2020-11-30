import React, { Component } from "react";
// import logo from "../assets/images/logo.jpg";
import logo from "../assets/images/logo.ico";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <div class={`${"ui small menu"} header-container`}>
        <img class="item logo" src={logo}></img>
        <a class="item">Home</a>
        <a class="item">Currently Watching</a>
        <a class="item">Completed</a>
        <div class="right menu">
          <div class="item">
            <button class="ui google plus button">Google Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
