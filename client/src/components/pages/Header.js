import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.ico";
import "./Header.css";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <React.Fragment>
            <div className="right menu">
              <div className="item">
                <a href="/auth/google">
                  <button className="ui google plus button">
                    Google Login
                  </button>
                </a>
              </div>
            </div>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            {/* <a className="item">Completed</a>
            <a className="item">Currently Watching</a>
            <a className="item">Plan to Watch</a> */}
            <div className="right menu">
              <div className="item">
                <a href="/api/logout">
                  <button className="negative ui button">Log Out</button>
                </a>
              </div>
            </div>
          </React.Fragment>
        );
    }
  }

  render() {
    return (
      <div className={`${"ui huge menu"} header-container`}>
        <div
          className="ui mini image"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "25px",
            marginRight: "10px",
          }}
        >
          <img alt="Movie Tracker Logo" src={logo}></img>
        </div>
        <Link to="/" className="item">
          Home
        </Link>
        <Link to="/search" className="item">
          Search
        </Link>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
