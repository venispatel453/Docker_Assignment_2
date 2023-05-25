console.log("connected");
const express = require("express");
const bookCard = require("../model/bookreg");
const bodyParser = require("body-parser");

// const localStorage = require("node-localstorage");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// localStorage.getItem('user_id');

const regBook = async (req, res) => {
  console.log(req.body);
  const p_id = req.body.user_id;
  const bookhave = req.body.bookhave;
  const author = req.body.Aubookhave;
  const bookwant = req.body.ExBname;
  const Aubookwant = req.body.ExBAname;

  const newbookcard = {
    id: p_id,
    bookHave: bookhave,
    bookAuthor: author,
    bookWant: bookwant,
    Abookwant: Aubookwant,
  };
  console.log(newbookcard);
  try {
    const response = await bookCard.create(newbookcard);
    //window.alert("Succesfully Posted");
    //res.redirect("/swap");
    res.json({ msg: "Request Placed Successfully" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = regBook;
