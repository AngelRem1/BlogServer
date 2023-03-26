// dot env
require("dotenv").config();

// imports
const express = require("express");
const cors = require("cors");
const dbo = require("./db/connect");

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
// allows us to parse json
app.use(express.json());
// importing routes
app.use(require("./routes/recordJournals"));

app.route("/").get((req, res) => {
  res.send("hello");
});

dbo.connectToDb((err) => {
  if (err) throw err;

  app.listen(port, () => {
    console.log(`Connected to port: ${port}`);
  });
});
