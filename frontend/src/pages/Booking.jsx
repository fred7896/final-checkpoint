import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ReactModal from "react-modal";
import {
  FaWindowClose,
  FaMinus,
  FaPlus,
  FaCartArrowDown
} from "react-icons/fa";
import { IconContext } from "react-icons";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      name: "",
      city: "",
      shows: [],
      products: [],
      columns: [
        {
          dataField: "city",
          text: "Ville",
          filter: textFilter()
        },
        {
          dataField: "date",
          text: "Date",
          filter: textFilter()
        },
        {
          dataField: "categorie",
          text: "Categorie",
          filter: textFilter()
        },
        {
          dataField: "price",
          text: "Tarif",
          filter: textFilter()
        }
      ],
      showModal: false,
      itemData: 0,
      quantite: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDisplayList = this.handleDisplayList.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  addQuantity() {
    const qte = this.state.quantite;
    this.setState({
      quantite: qte + 1
    });
  }

  removeQuantity() {
    if (this.state.quantite > 1) {
      const qte = this.state.quantite;
      this.setState({
        quantite: qte - 1
      });
    }
  }

  handleDisplayList(event) {
    event.preventDefault();
    axios.get("http://localhost:5000/api/products/list").then(res => {
      this.setState({
        products: res.data
      });
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOpenModal = id => {
    this.setState({
      showModal: true,
      itemData: id
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    const products = this.state.products.map(el => {
      let showDate = new Date(el.show_date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return { ...el, date: showDate.toLocaleDateString("fr-FR", options) };
    });
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.handleOpenModal(row.id);
        console.log(row);
      }
    };
    return (
      <React.Fragment>
        <Navbar />
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Cart options Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-body">
            <div className="row d-flex">
              <div className="col-10 name-product">Reservation</div>
              <IconContext.Provider
                value={{
                  color: "#FF9500",
                  className: "global-class-name",
                  size: "2em",
                  style: { verticalAlign: "middle" }
                }}
              >
                <div className="col-2" onClick={this.handleCloseModal}>
                  <FaWindowClose />
                </div>
              </IconContext.Provider>
            </div>
            <ul className="row d-flex my-3 justify-content-center qte">
              {products
                .filter(product => {
                  return product.id === this.state.itemData;
                })
                .map((el, idx) => {
                  return <li key={idx}>{el.product_name}</li>;
                })}
            </ul>
            <div className="row d-flex my-3 justify-content-center qte">
              <div className="col-6">Quantité</div>
              <div className="col-2" onClick={this.removeQuantity.bind(this)}>
                <FaMinus />
              </div>
              <div className="col-2">{this.state.quantite}</div>
              <div className="col-2" onClick={this.addQuantity.bind(this)}>
                <FaPlus />
              </div>
            </div>
            <div className="row d-flex my-3 justify-content-center qte">
              <div className="col-12 icon-center p-2">
                <FaCartArrowDown />
              </div>
            </div>
          </div>
        </ReactModal>
        <div className="d-flex row">
          <div className="container-price-list col-md-6 col p-5">
            <h3>Categorie et prix des places</h3>
            <table className="price-list my-2">
              <tbody>
                <tr className="my-1">
                  <td>A - B - C - D</td>
                  <td>24€</td>
                </tr>
                <tr className="my-1">
                  <td>E - F - G - H</td>
                  <td>34€</td>
                </tr>
                <tr className="my-1">
                  <td>I - J - K - L</td>
                  <td>27€</td>
                </tr>
                <tr className="my-1">
                  <td>Boxes</td>
                  <td>54€</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="container-map col-md-6 col">
            <img
              src={require("../pricing_map.png")}
              alt="pricing"
              className="img-pricing"
            />
          </div>
        </div>
        <div className="row p-5">
          <h3>Reservation</h3>
          <form
            className="booking-container"
            onSubmit={this.handleDisplayList}
          >
            <div className="input-name">
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={evt => {
                  this.handleChange(evt);
                }}
                id="name"
                placeholder="Nom Prenom"
                required
              />
            </div>
            <input type="submit" value="Valider" />
          </form>
        </div>
        <div className="row product-list my-3">
          <BootstrapTable
            keyField="id"
            data={products}
            columns={this.state.columns}
            hover
            condensed
            rowEvents={rowEvents}
            filter={filterFactory()}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default Booking;
