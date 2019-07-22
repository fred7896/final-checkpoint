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

//LISTE DES PRODUITS
app.get("/api/products/list", (req, res) => {
  db.query(
    `SELECT p.id, pl.city, p.product_name, p.categorie, p.price, s.show_date FROM product AS p INNER JOIN circus_show AS s ON p.show_id = s.id INNER JOIN place AS pl ON pl.id = s.place_id`,
    (err, results) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("Erreur lors de récupération de la liste des produits");
      } else {
        res.json(results);
      }
    }
  );
});

//INSERTION PANIER
app.post("/api/cart/ajout", (req, res) => {
  const formData = req.body;
  db.query("INSERT INTO `cart_item` SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'ajout d'un article");
    } else {
      res.json(results);
    }
  });
});

// //VOIR PANIER
// app.get("/api/cart", (req, res) => {

// })

app.listen(PORT, () => {
  console.log(`API root available at http://localhost:${PORT}/`);
});
