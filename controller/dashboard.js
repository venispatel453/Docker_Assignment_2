const book = require("../model/book");

const getAllBooks = async (req, res) => {
  const allBooks = await book.find({});
  res.json({ status: "success", books: allBooks });
};

const getBook = async (req, res) => {
  const { id } = req.params;
  const bookData = await book.find({ _id: id });
  res.json(...bookData);
};

const updateBookRecords = async (req, res) => {
  try {
    const response = await book.updateMany({}, { $set: { addedBy: "admin" } });
    return res.json({ response });
  } catch (error) {
    console.log(error);
  }
};

const userAddedBooks = async (req, res) => {
  try {
    const { userId } = req.query;
    const response = await book.find({ addedBy: userId });
    return res.json({ response });
  } catch (error) {
    console.log(error);
  }
};

const findBooks = async (req, res) => {
  try {
    let { books } = req.query;
    books = JSON.parse(books);
    console.log(books);
    const response = await book.find({ _id: { $in: [...books] } });
    return res.json({ response });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllBooks,
  getBook,
  updateBookRecords,
  findBooks,
  userAddedBooks,
};
