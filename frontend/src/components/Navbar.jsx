import React from "react";
import { IconContext } from "react-icons";
import { FaShoppingBag, FaTrash } from "react-icons/fa";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMenu: false
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-navbar d-flex row">
          <div className="container-navbar-title p-5 col-5">
            <h1>SOVIET CIRCUS</h1>
          </div>
          {/* <div className="container-navbar-list p-5 kyril-bold">
          <ul>
            <li className="p-3">Le cirque</li>
            <li className="p-3">La Tournée</li>
            <li className="p-3">Reserver</li>
          </ul> */}
          <ul className="navbar-right d-flex kyril-bold p-5 col-7 justify-content-end">
          <li className="p-3">Le cirque</li>
          <li className="p-3">La Tournée</li>
          <li className="p-3">Reserver</li>
            <IconContext.Provider
              value={{
                color: "#520a0a",
                className: "global-class-name",
                size: "1.8em",
                style: { verticalAlign: "middle" }
              }}
            >
              <li className="p-1">
                <FaShoppingBag />
              </li>
            </IconContext.Provider>

            <li className="p-1" onClick={this.showDropdownMenu}>
              Mon Panier
            </li>
            <li className="badge p_1">3</li>
          </ul>
        </div>
        {this.state.displayMenu ? (
          <div className="container-cart">
            <div className="shopping-cart">
              <div className="shopping-cart-header">
                <FaShoppingBag />
                <div className="badge">3</div>
                <div className="shopping-cart-total d-flex">
                  <div className="lighter-text">Total:</div>
                  <div className="main-color-text">105€</div>
                </div>
              </div>

              <ul className="shopping-cart-items">
                <li className="clearfix">
                <div className="trash"><FaTrash /></div>
                  <div className="item-name">
                    Paris - 2/09/2019 - cat A-B-C-D
                  </div>
                  <div className="item-price">24€</div>
                  <div className="item-quantity">Quantité: 01</div>
                </li>

                <li className="clearfix">
                <div className="trash"><FaTrash /></div>
                  <div className="item-name">
                    Amiens - 4/10/2019 - cat I-J-K-L
                  </div>
                  <div className="item-price">27€</div>
                  <div className="item-quantity">Quantité: 01</div>
                </li>

                <li className="clearfix">
                <div className="trash"><FaTrash /></div>
                  <span className="item-name">
                    Lille - 7/10/2019 - cat Boxes
                  </span>
                  <span className="item-price">54€</span>
                  <span className="item-quantity">Quantité: 01</span>
                </li>
              </ul>
              <div className="button">Checkout</div>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Navbar;
