const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");

app.use(cors());
const bodyParser = require("body-parser");
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// TEST
app.get("/", (req, res) => {
  const msg = "Circus backend";
  console.log(msg);
  res.status(200).send(msg);
});

app.listen(PORT, () => {
  console.log(`API root available at http://localhost:${PORT}/`);
});
