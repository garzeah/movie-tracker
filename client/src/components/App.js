import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} /> */}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
