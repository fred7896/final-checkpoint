import React from "react";

class Navbar extends React.Component {
  render() {
    return (
      <div className="container-navbar d-flex">
        <div className="container-navbar-title p-5">
          <h1>SOVIET CIRCUS</h1>
          <p className="kyril-bold">
            Viens voir Vladimir défier les ours de Sibérie !
          </p>
        </div>
        <div className="container-navbar-list p-5 kyril-bold">
          <ul>
            <li className="p-3">Le cirque</li>
            <li className="p-3">La Tournée</li>
            <li className="p-3">Reserver</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
