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
  FaCartArrowDown,
  FaTrash
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
      showModal: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitCity = this.handleSubmitCity.bind(this);
    this.handleSubmitTicket = this.handleSubmitTicket.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/api/cities`).then(res => {
      this.setState({
        cities: res.data
      });
    });
    axios.get("http://localhost:5000/api/products/list").then(res => {
      this.setState({
        products: res.data
      });
    });
  }

  handleSubmitCity(event) {
    event.preventDefault();
    axios
      .get(`http://localhost:5000/api/shows/${this.state.city}`)
      .then(res => {
        this.setState({
          shows: res.data
        });
      });
  }

  handleSubmitTicket(event) {
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
      showModal: true
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
        console.log(e);
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
              <div className="col-10 name-product">Nom du Show</div>
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
            <div className="row d-flex my-3 justify-content-center qte">
            <div className="col-6">Quantité</div><div className="col-2"><FaMinus /></div><div className="col-2">1</div><div className="col-2"><FaPlus /></div>
            </div>
            <div className="row d-flex my-3 justify-content-center qte">
            <div className="col-12 icon-center p-2"><FaCartArrowDown /></div>
            </div>
          </div>
        </ReactModal>
        <div className="d-flex row">
          <div className="container-price-list col-md-6 col">
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
        {/* <div className="d-flex row">
          <h3>Reservation</h3>
          <form className="booking-container" onSubmit={this.handleSubmitCity}>
            <div className="input-city">
              <label>
                <select
                  value={this.state.city}
                  onChange={evt => {
                    this.handleChange(evt);
                  }}
                  name="city"
                  id="city"
                >
                  <option className="placeholder" value="1" selected>
                    Ville
                  </option>
                  {this.state.cities.map((city, idx) => {
                    return (
                      <option key={idx} value={city.id}>
                        {city.city}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <input type="submit" value="Valider" />
          </form>
          <form
            className="booking-container"
            onSubmit={this.handleSubmitTicket}
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

            <div className="input-cat">
              <label>
                <select
                  className="empty"
                  value={this.state.cat}
                  onChange={evt => {
                    this.handleChange(evt);
                  }}
                  name="cat"
                  id="cat"
                >
                  <option className="placeholder" value="" selected>
                    Categorie
                  </option>
                  <option value="A-B-C-D">A - B - C - D</option>
                  <option value="E-F-G-H">E - F - G - H</option>
                  <option value="I-J-K-L">I - J - K - L</option>
                  <option value="Boxes">Boxes</option>
                </select>
              </label>
            </div>
            <div className="input-date">
              <label>
                <select
                  className="empty"
                  value={this.state.date}
                  onChange={evt => {
                    this.handleChange(evt);
                  }}
                  name="date"
                  id="date"
                >
                  <option className="placeholder" value="" selected>
                    Date
                  </option>
                  {this.state.shows.map((show, idx) => {
                    let showDate = new Date(show.show_date);
                    const options = {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    };
                    return (
                      <option key={idx} value={show.id}>
                        {showDate.toLocaleDateString("fr-FR", options)}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <input type="submit" value="Valider ma reservation" />
          </form>
        </div> */}
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
