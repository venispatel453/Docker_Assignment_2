console.log("connected");
const books = document.getElementById("booksContainer");
let allBooks;

const getAllBooks = async () => {
  const response = await fetch("http://localhost:8000/getAllBooks").then(
    (data) => data.json()
  );
  allBooks = response.books;
  console.log(allBooks);
  showBooks();
};
getAllBooks();

const loadUser = async () => {
  let { userData } = await fetch(
    `http://localhost:8000/getUser/?userId=${localStorage.getItem("user_id")}`
  ).then((data) => data.json());
  userData = userData[0];
  console.log(userData);
  loadUserData(userData);
};

const loadPage = (img) => {
  location.href = `/book/${img.id}`;
};

const loadUserData = ({ coins }) => {
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
  loadUser();
}

/* <div class="books-display">
        <div class="books">
            <img src="/Images/hound of baskerville.jpg" style="width: 180px; height:280px;">
        </div>
        <div class="books">
            <img src="/Images/loose end book.jpg" style="width: 180px; height:280px;">
        </div>
        <div class="books">
            <img src="/Images/missing by adam nicolas.webp" style="width: 180px; height:280px;">
        </div>
        <div class="books">
            <img src="/Images/mysterious affair at styles.avif" style="width: 180px; height:280px;">
        </div>
        <div class="books">
            <img src="/Images/women in white.jpg" style="width: 180px; height:280px;">
        </div>
    </div> */
{
  /* <h1 style="margin-left:45%; font-size: 40px;">Fiction</h1>
        <br>
        <br>
        <div class="book-slider">
            <div class="slide-track">
                <div class="books">
                    <img src="/images/hound of baskerville.jpg" style="width: 180px; height:280px;">
                </div>
                <div class="books">
                    <img src="/images/loose end book.jpg" style="width: 180px; height:280px;">
                </div>
                <div class="books">
                    <img src="/images/missing by adam nicolas.webp" style="width: 180px; height:280px;">
                </div>
                <div class="books">
                    <img src="/images/mysterious affair at styles.avif" style="width: 180px; height:280px;">
                </div>
                <div class="books">
                    <img src="/images/women in white.jpg" style="width: 180px; height:280px;">
                </div>
            </div>
        </div> */
}
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

const showBooks = () => {
  const booksDiv = document.querySelector("#booksContainer");
  const genres = new Set();
  allBooks.forEach((book) => {
    book.genre.forEach((gen) => genres.add(gen));
  });
  genres.forEach((genre) => {
    const bookArray = allBooks.filter((book) => book.genre.includes(genre));
    let card = ``;
    bookArray.forEach((book) => {
      card += `
      <div class="slide">
      <img id=${book._id}  src=${book.bookImage} style="width: 180px; height:280px;" onclick=loadPage(this)>
      </div>`;
    });
    let bookCard = `
    <div>
      <h1 style="margin-left:45%; font-size: 40px;">${genre}</h1>
        <br>
        <br>
        <div class="book-slider">
        <div class="slide-track">
        ${card}
      </div>
      </div>
    </div>
    `;
    booksDiv.innerHTML += bookCard;
  });

  /*{ <section class="products-area pt-100 pb-70">
                  <div class="container">
                      <div class="section-title text-start">
                          <span class="sub-title">See Our Collection</span>
                          <h2>temp</h2>
                          <a  class="default-btn">Shop More</a>
                      </div>
  
                      <div class="products-slides owl-carousel owl-theme" id="booksContainer">
                          <div class="single-products-box">
                              <div class="products-image">
                              <img   src='/Images/banner-peach.jpg' style="width: 180px; height:280px;" onclick=loadPage(this)>
                              </div>
                              </div> 
                          <div class="single-products-box">
                              <div class="products-image">
                              <img   src='/Images/banner-peach' style="width: 180px; height:280px;" onclick=loadPage(this)>
                              </div>
                              </div> 
                          <div class="single-products-box">
                              <div class="products-image">
                              <img   src='/Images/banner-peach' style="width: 180px; height:280px;" onclick=loadPage(this)>
                              </div>
                              </div> 
                          <div class="single-products-box">
                              <div class="products-image">
                              <img   src='/Images/banner-peach' style="width: 180px; height:280px;" onclick=loadPage(this)>
                              </div>
                              </div> 
                      </div>
                  </div>
    </section> }*/

  //   const showBooks = () => {
  //     alert('hello')
  //     const booksDiv = document.querySelector("#booksContainer");
  //     const genres = new Set();
  //     allBooks.forEach((book) => {
  //       book.genre.forEach((gen) => genres.add(gen));
  //     });
  //     genres.forEach((genre) => {
  //       const bookArray = allBooks.filter((book) => book.genre.includes(genre));
  //       let card = ``;
  //       bookArray.forEach((book) => {
  //         card += `
  //         <div class="single-products-box">
  //         <div class="products-image">
  //         <img id=${book._id}  src=${book.bookImage} style="width: 180px; height:280px;" onclick=loadPage(this)>
  //         </div>
  //         </div>`;
  //       });
  //       let bookCard = `
  //       <section class="products-area pt-100 pb-70">
  //                     <div class="container">
  //                         <div class="section-title text-start">
  //                             <span class="sub-title">See Our Collection</span>
  //                             <h2>${genre}</h2>
  //                             <a href="products-right-sidebar.html" class="default-btn">Shop More</a>
  //                         </div>

  //                         <div class="products-slides owl-carousel owl-theme" style="display:flex;">
  //                           ${card}
  //                         </div>
  //                     </div>
  //       </section>
  //       `;
  //       booksDiv.innerHTML += bookCard;
  //     });

  console.log(genres);
};
