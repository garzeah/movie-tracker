import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./pages/Header";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import MoviePage from "./pages/MoviePage";
import history from "../history";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route path="/search/:id" component={SearchResults} />
            <Route path="/movie/:id" component={MoviePage} />
            <Route component={NoMatch}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);
