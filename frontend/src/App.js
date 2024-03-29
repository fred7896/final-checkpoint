import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Tour from "./pages/Tour";
import Booking from "./pages/Booking";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/tournee" component={Tour} />
        <Route path="/reserver" component={Booking} />
      </BrowserRouter>
    );
  }
}

export default App;
