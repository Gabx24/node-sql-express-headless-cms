require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const db = require("./database/client.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hi there team");
});

app.route("/api/blogpost").get(async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * from blogpost;");
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});
app.route("/api/blogpost/:id").get(async (req, res) => {
  try {
    console.log(req.params.id);
    const { rows } = await db.query(
      `SELECT * from blogpost WHERE id=${req.params.id};`
    );
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});
app.route("/api/author").get(async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * from author;");
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});
app.route("/api/author/:id").get(async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT * from author WHERE id=${req.params.id};`
    );
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
