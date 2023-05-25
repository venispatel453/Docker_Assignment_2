console.log("connected");
let book;
const showBook = async () => {
  console.log(location.pathname);
  book = await fetch(location.pathname, {
    method: "post",
  }).then((data) => data.json());

  document.querySelector("#author").innerHTML = book.bookAuthor;
  document.querySelector("#description").innerHTML = book.description;
  document.querySelector("#coins").innerHTML = book.price;
  document.querySelector("#book_name").innerHTML = book.bookName;
  document.querySelector("#img").src = book.bookImage;
  loadUser();
  console.log(book);
};
showBook();

const viewBook = () => {
  const viewUrl = book.location.split("\\");
  //console.log(viewUrl);
  location.href = `/bookView/${viewUrl[viewUrl.length - 1]}`;
};

const loadUserData = (data) => {
  // document.querySelector("#author").innerHTML = book.bookAuthor;
  // document.querySelector("#description").innerHTML = book.description;
  // document.querySelector("#coins").innerHTML = book.price;
  // document.querySelector("#book_name").innerHTML = book.bookName;
  // document.querySelector("#img").src = book.bookImage;
  let bookId = location.pathname.split("/");
  bookId = bookId[bookId.length - 1];
  console.log(bookId);
  console.log(data.coins);
  console.log(data.bookAccess.includes(bookId));
  console.log(data.bookAccess);
  if (!data.bookAccess.includes(bookId)) {
    console.log(document.getElementById("mainBook").value);
    document.getElementById(
      "main-btn"
    ).innerHTML = `<button id="mainBook" style="padding:10px;" onclick="purchaseBook(${data.coins})">PURCHASE THIS BOOK</button>`;
  } else {
    document.getElementById(
      "main-btn"
    ).innerHTML = `<button id="mainBook" style="padding:10px;" onclick="viewBook()">READ THIS BOOK</button>`;
  }
  //   let optionDiv = document.getElementById("others-option");
  //   optionDiv.innerHTML = ` <div class="option-item">
  //   <button>${coins}</button>
  // </div>
  // <div class="option-item">
  //   <button>Logout</button>
  // </div>`
  //   console.log(optionDiv.innerHTML)
};

const loadUser = async () => {
  let { userData } = await fetch(
    `http://localhost:8000/getUser/?userId=${localStorage.getItem("user_id")}`
  ).then((data) => data.json());
  userData = userData[0];
  console.log(userData);
  loadUserData(userData);
};

const purchaseBook = async (coins) => {
  console.log(book._id);
  if (coins - book.price < 0) {
    alert("Insufficient coins");
  }
  if (confirm("Do you wish to purchase ?")) {
    const obj = {
      price: book.price,
      id: book._id,
    };
    const response = await fetch(
      `http://127.0.0.1:8000/purchaseBook/?bookData=${JSON.stringify(
        obj
      )}&&userId=${localStorage.getItem("user_id")}`,
      {
        method: "post",
      }
    ).then((data) => data.json());
    //console.log(response);
    if (response.status == "Success") {
      alert(response.msg);
    }
    loadUser();
  }
};

const loadNav = async () => {
  let { userData } = await fetch(
    `http://localhost:8000/getUser/?userId=${localStorage.getItem("user_id")}`
  ).then((data) => data.json());
  userData = userData[0];
  console.log(userData);
  loadNavData(userData);
};

const loadNavData = ({ coins }) => {
  console.log(coins);
  let optionDiv = document.getElementById("others-option");
  optionDiv.innerHTML = ` <div class="option-item">
  <button>${coins}</button>
</div>
<div class="option-item">
  <button>
  <a href="/logout">Logout</a>
</button>
</div>`;
  console.log(optionDiv.innerHTML);
};
//console.log(typeof  localStorage.getItem('user_id') == "string")
if (typeof localStorage.getItem("user_id") == "string") {
  loadNav();
}
