import React from "react";

import Navbar from "../components/Navbar";

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="p-3 d-flex">
          <div className="container-img">
            <img
              src={require("../family-circus.jpg")}
              alt="famille"
              className="img-family"
            />
          </div>
          <div className="container-history-text p-5 d-flex">
            <div>
              <h3>Notre Histoire</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vitae sodales ex, at condimentum sem. Fusce et molestie
                urna. Curabitur placerat arcu sed augue malesuada, sed pulvinar
                enim efficitur. Nulla accumsan, diam ut tristique feugiat, nisl
                elit semper risus, eu pellentesque diam libero vitae eros. Ut
                feugiat mi non quam commodo, a porttitor mauris pellentesque.
                Proin in nibh cursus, tempus lorem ac, iaculis erat. Fusce
                maximus tristique velit id venenatis.
              </p>
            </div>
          </div>
        </div>
        <div className="p-3 d-flex">
          <div className="container-history-text p-5 d-flex">
            <div>
              <h3>Nos installations</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vitae sodales ex, at condimentum sem. Fusce et molestie
                urna. Curabitur placerat arcu sed augue malesuada, sed pulvinar
                enim efficitur. Nulla accumsan, diam ut tristique feugiat, nisl
                elit semper risus, eu pellentesque diam libero vitae eros. Ut
                feugiat mi non quam commodo, a porttitor mauris pellentesque.
                Proin in nibh cursus, tempus lorem ac, iaculis erat. Fusce
                maximus tristique velit id venenatis.
              </p>
            </div>
          </div>
          <div className="container-img">
            <img
              src={require("../Russian_Circus_1.jpg")}
              alt="famille"
              className="img-family"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
