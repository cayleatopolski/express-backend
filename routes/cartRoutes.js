const express = require("express");
const cartRoutes = express.Router();
const pool = require("../connection/connection");

function displayCart(req, res) {
  pool.query("select * from shoppingcart order by id").then(result => {
    res.send(result.rows);
  });
}

cartRoutes.get("/cart-items", displayCart);

cartRoutes.post("/cart-items", (req, res) => {
  pool
    .query(
      "insert into shoppingcart (product, price, quantity) values ($1::text, $2::money, $3::int)",
      [req.body.product, req.body.price, req.body.quantity]
    )
    .then(() => {
      displayCart(req, res);
    });
});

cartRoutes.put("/cart-items/:id", (req, res) => {
  pool
    .query("update shoppingcart set quantity=$1::int where id=$2::int", [
      req.body.quantity,
      req.params.id
    ])
    .then(() => {
      displayCart(req, res);
    });
});

cartRoutes.delete("/cart-items/:id", (req, res) => {
  pool
    .query("delete from shoppingcart where id=$1::int", [req.params.id])
    .then(() => {
      displayCart(req, res);
    });
});

module.exports = cartRoutes;
