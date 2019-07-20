import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      name: "",
      city: "",
      shows: [],
      products : [],
      cat: "",
      date: "",
      bookingNumber: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitCity = this.handleSubmitCity.bind(this);
    this.handleSubmitTicket = this.handleSubmitTicket.bind(this);
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/api/cities`).then(res => {
      this.setState({
        cities: res.data
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
    axios.get('http://localhost:5000/api/products/list').then(res => {
      this.setState({
        products : res.data
      })
    })
    
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    console.log(this.state.bookingNumber);
    console.log(this.state.ticket);
    return (
      <React.Fragment>
        <Navbar />
        <div className="d-flex">
          <div className="container-price-list mx-5">
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
            <div className="d-flex">            
              <h3>Reservation</h3>
            </div>
            <form
              className="booking-container"
              onSubmit={this.handleSubmitCity}
            >
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
          </div>
          <div className="container-map">
            <img
              src={require("../pricing_map.png")}
              alt="pricing"
              className="img-pricing"
            />
          </div>
        </div>
        <ul>{this.state.products.map((product, idx) => {
          return (
            <li key={idx}>{`${product.product_name}`}</li>
          );

        })}</ul>
      </React.Fragment>
    );
  }
}
export default Booking;
