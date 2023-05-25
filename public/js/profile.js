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

const getUserDetails = async () => {
  let { userData } = await fetch(
    `http://localhost:8000/getUser/?userId=${localStorage.getItem("user_id")}`
  ).then((data) => data.json());
  userData = userData[0];
  console.log(userData);
  return userData;
};

const getUserAddedBooks = async () => {
  const response = await fetch(
    `http://localhost:8000/userAddedBooks/?userId=${localStorage.getItem(
      "user_id"
    )}`
  ).then((data) => data.json());
  console.log(response);
  return response;
};

const getUserAddedRequests = async () => {
  const response = await fetch(
    `http://localhost:8000/userAddedRequests/?userId=${localStorage.getItem(
      "user_id"
    )}`
  ).then((data) => data.json());
  console.log(response);
  return response;
};

const getUserAccessbooks = async () => {
  const data = await getUserDetails();
  //console.log(data);
  books = JSON.stringify(data.bookAccess);
  const response = await fetch(
    `http://localhost:8000/findBooks/?books=${books}`
  ).then((data) => data.json());
  console.log(response);
  return response;
};

let view = document.getElementById("view_profile").innerHTML;
let edit = document.getElementById("edit").innerHTML;
let purchase = document.getElementById("purchase").innerHTML;
let write = document.getElementById("write").innerHTML;
let request = document.getElementById("request").innerHTML;
let subscribe = document.getElementById("subscribe").innerHTML;

async function viewprofile() {
  const data = await getUserDetails();
  document.getElementById("view").innerHTML = `<div style="top:3%;"></div>
  <li><span>Name:</span><span>${data.name}</span></li>
                        <li><span>Email:<span>${data.email}</span></span></li>
                        <li><span>Coins Available:<span>${data.coins}</span></span></li>
                        
                        `;
  document.getElementById("view").style.display = "block";
}
async function editprofile() {
  const data = await getUserDetails();
  //console.log("here", data);
  document.getElementById("edit-username").setAttribute("value", data.name);
  document.getElementById("edit-email").setAttribute("value", data.email);
  //console.log(document.getElementById("username").value);
  document.getElementById("view").innerHTML =
    document.getElementById("edit").innerHTML;
  //document.getElementById("edit").style.display = "block";
}
async function purchasebooks() {
  const data = await getUserAccessbooks();
  let card = `<h2>Purchased Books</h2>`;
  console.log(data);
  data.response.forEach((element) => {
    let loc = element.location.split("\\")[4];
    console.log(loc);
    card += `<div class="book-card" style="display: flex;">
            <div class="col-lg-2 col-md-2">
                <div class="products-details-image">
                    <img src=${element.bookImage}>
                </div>
            </div>
            <div class="col-lg-10 col-md-10">
                <div class="book-char">
                    <div><b>Name :</b> ${element.bookName}</div>
                    <div><b>Author:</b> ${element.bookAuthor}</div>
                    <div><b>Description :</b> ${element.description}</div>
                    <button style="margin-left: 0px;" onclick="bookView('${loc}')">Read Book</button>
                </div>
            </div>
        </div>`;
  });
  document.getElementById("view").innerHTML = card;
}
async function writebook() {
  const data = await getUserAddedBooks();
  let card = `<h2>Published Books</h2>`;
  console.log(data);
  data.response.forEach((element) => {
    let loc = element.location.split("\\")[4];
    console.log(loc);
    card += `<div class="book-card" style="display: flex;">
            <div class="col-lg-2 col-md-2">
                <div class="products-details-image">
                    <img src=${element.bookImage}>
                </div>
            </div>
            <div class="col-lg-10 col-md-10">
                <div class="book-char">
                    <div><b>Name :</b> ${element.bookName}</div>
                    <div><b>Author:</b> ${element.bookAuthor}</div>
                    <div><b>Description :</b> ${element.description}</div>
                    <button style="margin-left: 0px;" onclick="bookView('${loc}')">Read Book</button>
                </div>
            </div>
        </div>`;
  });
  document.getElementById("view").innerHTML = card;
  // document.getElementById("view").innerHTML = write;
  // document.getElementById("write").style.display = "block";
}
async function requestbooks() {
  const data = await getUserAddedRequests();
  const userData = await getUserDetails();
  let card = `Your Requests`;
  data.response.forEach((element) => {
    card += `<div id="book" class="description">
                    <div>
                        <input type="hidden" name="user" value="${element.id}">
                        <h1 id="UName">${userData.name}</h1><br>
                        <label> Available Book : </label>
                        <div class="form-item" id="text" style="background-color:white; padding:5px;">
                        ${element.bookHave} 
                        </div>
                        <label>Author Name</label>
                        <div class="form-item" id="author" style="background-color:white; padding:5px;">
                        ${element.bookAuthor}
                        </div>
                        <label>Requested Book</label>
                        <div class="form-item" id="request" style="background-color:white; padding:5px;width: 500px;">
                        ${element.bookWant[0]} (${element.Abookwant[0]}) <br>
                        ${element.bookWant[1]} (${element.Abookwant[1]}) <br>
                        ${element.bookWant[2]} (${element.Abookwant[2]}) <br>
                        </div>
                        <button type="submit" class="testbutton" style="margin-top: 5px;margin-left:0; padding: 15px;">Delete Request</button>
                    </div>
                  </div>`;
  });
  document.getElementById("view").innerHTML = card;
  //document.getElementById("request").style.display = "block";
}
function subscribepack() {
  alert("subscribe");
  document.getElementById("view").innerHTML = subscribe;
}
viewprofile();

const purchaseCoins = async (cost, coins) => {
  const data = await getUserDetails();
  $(document).ready(function () {
    var settings = {
      url: "/create/orderId",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        amount: `${Number(cost) * 100}`,
      }),
    };
    console.log(settings, "settings");
    //creates new orderId everytime
    $.ajax(settings).done(function (response) {
      orderId = response.orderId;
      console.log(orderId);
      $("button").show();
    });
  });
  var options = {
    key: "rzp_test_ypUiJhAYzxNIKU", // Enter the Key ID generated from the Dashboard
    amount: `${Number(cost) * 100}`, //For dynamic Number("amt") Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise `${Number(amt)*100}`
    currency: "INR",
    name: `${data.name}`,
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      alert("Kindly copy Your Payment Id : " + response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
      var settings = {
        url: "/api/payment/verify",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ response }),
      };
      addCoins(coins);
      alert("Coins added Successfully");
    },
    theme: {
      color: "#3399cc",
    },
  };
  console.log(options);
  var rzp1 = new Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
  rzp1.open();
};

const addCoins = async (coins) => {
  let response = await fetch(
    `http://localhost:8000/addCoins/?coins=${coins}&&userId=${localStorage.getItem(
      "user_id"
    )}`,
    {
      method: "post",
    }
  ).then((data) => data.json());
  console.log(response);
};

const updateDetails = async () => {
  const username = document.getElementById("edit-username").value;
  const password = document.getElementById("edit-password").value;
  const email = document.getElementById("edit-email").value;
  const obj = {
    username: username,
    password: password,
    email: email,
  };
  const response = await fetch(
    `http://localhost:8000/updateDetails/?details=${JSON.stringify(
      obj
    )}&&userId=${localStorage.getItem("user_id")}`,
    {
      method: "post",
    }
  ).then((data) => data.json());
  console.log(response);
};

function bookView(loc) {
  console.log(loc);
  location.href = `/bookView/${loc}`;
}
