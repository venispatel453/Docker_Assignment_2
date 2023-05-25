const func = async () => {
  // window.alert("Function called");
  response = await fetch(`/swap`, {
    method: "post",
  }).then((data) => data.json());
  // console.log(response);
  setbook(response.books);
};

const setbook = (resp) => {
  let cards = "No Book Available";
  // console.log(resp);
  resp.forEach((book) => {
    if (cards === "No Book Available") {
      cards = `<div id="book" class="description">
                    <form action="/chat" >
                        <input type="hidden" name="user" value="${book.id}">
                        <h1 id="UName">Mahesh Magarde</h1><br>
                        <label> Available Book : </label>
                        <div class="form-item" id="text" style="background-color:white; padding:5px;">
                        ${book.bookHave} 
                        </div>
                        <label>Author Name</label>
                        <div class="form-item" id="author" style="background-color:white; padding:5px;">
                        ${book.bookAuthor}
                        </div>
                        <label>Requested Book</label>
                        <div class="form-item" id="request" style="background-color:white; padding:5px;width: 500px;">
                        ${book.bookWant[0]} (${book.Abookwant[0]}) <br>
                        ${book.bookWant[1]} (${book.Abookwant[1]}) <br>
                        ${book.bookWant[2]} (${book.Abookwant[2]}) <br>
                        </div>
                        <button type="submit" class="testbutton" onclick=messageUser()>Swap Request</button>
                    </form>
                  </div>`;
    } else {
      cards += `<div id="book" class="description">
                    <form action="/chat" >
                        <input type="hidden" name="user" value="${book.id}">
                        <h1 id="UName">Mahesh Magarde</h1><br>
                        <label> Available Book : </label>
                        <div class="form-item" id="text" style="background-color:white; padding:5px;">
                        ${book.bookHave} 
                        </div>
                        <label>Author Name</label>
                        <div class="form-item" id="author" style="background-color:white; padding:5px;">
                        ${book.bookAuthor}
                        </div>
                        <label>Requested Book</label>
                        <div class="form-item" id="request" style="background-color:white; padding:5px;width: 500px;">
                        ${book.bookWant[0]} (${book.Abookwant[0]}) <br>
                        ${book.bookWant[1]} (${book.Abookwant[1]}) <br>
                        ${book.bookWant[2]} (${book.Abookwant[2]}) <br>
                        </div>
                        <button type="submit" class="testbutton" style="margin-top: 5px;margin-left:0; padding: 15px;">Swap Request</button>
                    </form>
                  </div>`;
    }
  });
  document.getElementById("container").innerHTML = cards;
};

func();

function messageUser() {
  console.log("click");
}

const loadUser = async () => {
  let { userData } = await fetch(
    `http://localhost:8000/getUser/?userId=${localStorage.getItem("user_id")}`
  ).then((data) => data.json());
  userData = userData[0];
  console.log(userData);
  loadUserData(userData);
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
