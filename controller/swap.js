const SBooks = require("../model/bookreg");

let getbooks = async (req, res) => {
  try {
    let books = await SBooks.find();
    return res.json({ books });
    // console.log(books);
  } catch (error) {
    console.log(error);
  }
};

const userAddedRequests = async (req, res) => {
  try {
    const { userId } = req.query;
    const response = await SBooks.find({ id: userId });
    return res.json({ response });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getbooks, userAddedRequests };
