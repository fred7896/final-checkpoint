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

  shouldComponentUpdate(nextProps, nextState) {
    const differentCart = this.props.cart !== nextProps.cart;
    const displayMenu = this.state.displayMenu !== nextState.displayMenu;
    return differentCart || displayMenu;
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
    this.props.updateCart.bind(this);
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
    this.props.updateCart.bind(this);
  }

  render() {
    console.log(this.props.cart);
    console.log(this.state.displayMenu);
    return (
      <React.Fragment>
        <div className="container-navbar d-flex row">
          <div className="container-navbar-title p-5 col-5">
            <h1>SOVIET CIRCUS</h1>
          </div>
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
            <li className="badge p_1">{this.props.cart.length}</li>
          </ul>
        </div>
        {this.state.displayMenu ? (
          <div className="container-cart">
            <div className="shopping-cart">
              <div className="shopping-cart-header">
                <FaShoppingBag />
                <div className="badge">{this.props.cart.length}</div>
                <div className="shopping-cart-total d-flex">
                  <div className="lighter-text">Total:</div>
                  <div className="main-color-text">105€</div>
                </div>
              </div>

              <ul className="shopping-cart-items">
                {this.props.cart.map((article, idx) => {
                  return (
                    <li key={idx} className="clearfix">
                      <div
                        className="trash"
                        onClick={this.props.deleteFromCart.bind(
                          this,
                          article.id
                        )}
                      >
                        <FaTrash />
                      </div>
                      <div className="item-name">{article.product_name}</div>
                      <div className="item-price">{article.price}€</div>
                      <div className="item-quantity">
                        Quantité: {article.quantity}
                      </div>
                    </li>
                  );
                })}
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
