const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const { db } = require("./conf");

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

// LISTE DES SHOWS
app.get("/api/shows/list", (req, res) => {
  db.query(
    "SELECT city, begin_date, end_date FROM place WHERE begin_date > NOW()",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de récupération de l'id");
      } else {
        res.json(results);
      }
    }
  );
});

//LISTE DES VILLES UNIQUEMENT
app.get("/api/cities", (req, res) => {
  db.query(
    "SELECT id, city FROM place WHERE begin_date > NOW()",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de récupération de l'id");
      } else {
        res.json(results);
      }
    }
  );
});

//LISTE DES SHOWS DANS UNE VILLE DONNEE
app.get("/api/shows/:city", (req, res) => {
  const idCity = req.params.city;
  db.query(
    "SELECT id, show_name, show_date FROM circus_show WHERE place_id = ?",
    idCity,
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de récupération de l'id");
      } else {
        res.json(results);
      }
    }
  );
});

app.get("/api/booking", (req, res) => {
  db.query(
    `select id from booking where id >= LAST_INSERT_ID()`,
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de récupération de l'id");
      } else {
        res.json(results);
      }
    }
  );
});

app.post("/api/ticket", (req, res) => {
  const formData = req.body;
  db.query("INSERT INTO ticket SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de récupération de l'id");
    } else {
      res.json(results);
    }
  });
});

app.get("/api/tickets", (req, res) => {
  db.query(
    "SELECT t.name, t.category, s.show_name FROM ticket as t JOIN circus_show as s WHERE t.booking_id >= LAST_INSERT_ID() ",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de récupération de l'id");
      } else {
        res.json(results);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`API root available at http://localhost:${PORT}/`);
});
