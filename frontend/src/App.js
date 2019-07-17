import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <Route exact path="/" component={Home} />
        <Route path="/tournee" component={Tour} />
        <Route path="/reserver" component={Booking} />
      </BrowserRouter>
    );
  }
}

export default App;
