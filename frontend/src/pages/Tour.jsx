import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tour: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/shows/list`).then(res => {
      this.setState({
        tour: res.data
      });
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <Navbar />
        <h3 className="px-5 container-tableau">Vladimir Vs Wild</h3>
        <div className="container-tableau px-5 row">
        <table className="container-shows-list mx-5 p-5 col-7">
          <tbody>
            {this.state.tour.map((el, idx) => {
              let beginDate = new Date(el.begin_date);
              let endDate = new Date(el.end_date);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric"
              };
              return (
                <tr key={idx} className="p-2">
                  <td className="px-4 py-2">{el.city}</td>
                  <td>{`${beginDate.getDate()} - ${endDate.toLocaleDateString(
                    "fr-FR",
                    options
                  )} `}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="container-img col-5">
            <img
              src={require("../bear.png")}
              alt="famille"
              className="img-family"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Tour;
