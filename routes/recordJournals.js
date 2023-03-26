const express = require("express");
const dbo = require("../db/connect");
const Id = require("mongodb").ObjectId;

// router
const journalRoutes = express.Router();

// route in order to add journal
journalRoutes.route("/journals/add").post((req, res) => {
  let dbConnect = dbo.getDB();
  let journal = {
    name: req.body.name,
    entry: req.body.entry,
    email: req.body.email,
  };

  dbConnect.collection("journal").insertOne(journal, (err, response) => {
    if (err) throw err;

    console.log("journal has been aded");
    res.json(response);
  });
});

// route in order to get a list of all the journals within the db
journalRoutes.route("/journals").get((req, res) => {
  let dbConnect = dbo.getDB("test");

  dbConnect
    .collection("journal")
    .find({})
    .toArray((err, response) => {
      if (err) throw err;

      console.log("getting the list of journals");
      res.json(response);
    });
});

// route in order to get one journal by id
journalRoutes.route("/journals/:id").get((req, res) => {
  let dbConnect = dbo.getDB();
  let search = { _id: Id(req.params.id) };
  dbConnect.collection("journal").findOne(search, (err, response) => {
    if (err) throw err;

    console.log("journal by id");
    res.json(response);
  });
});

// updates journal
journalRoutes.route("/journals/update/:id").post((req, res) => {
  let dbConnect = dbo.getDB();
  let search = { _id: Id(req.params.id) };
  let newJournal = {
    $set: {
      name: req.body.name,
      entry: req.body.entry,
    },
  };
  dbConnect
    .collection("journal")
    .updateOne(search, newJournal, (err, response) => {
      if (err) throw err;

      res.json(response);
    });
});

// delete journal
journalRoutes.route("/:id").delete((req, res) => {
  let dbConnect = dbo.getDB();
  let search = { _id: Id(req.params.id) };

  dbConnect.collection("journal").deleteOne(search, (err, response) => {
    if (err) throw err;
    console.log("journal deleted");
    res.json(response);
  });
});

module.exports = journalRoutes;
