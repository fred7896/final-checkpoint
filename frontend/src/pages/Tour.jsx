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
        <h3 className="px-5">Vladimir Vs Wild</h3>
        <table className="container-shows-list mx-5 p-3">
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
                  <td>Reserver</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Tour;
