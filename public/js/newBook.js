console.log("connected");

const myform = document.getElementById("myform");
const myfile = document.getElementById("myfile");

myform.addEventListener("submit", async (e) => {
  e.preventDefault();
  alert("clicked");
  const formData = new FormData(myform);
  const addedBy = await checkForAdminAccess();
  formData.append("addedBy", addedBy);
  const response = await fetch("http://localhost:8000/newBook", {
    method: "post",
    body: formData,
  }).then((data) => data.json());
  addBookAccess(response.book);
  console.log(response);
});

const checkForAdminAccess = async () => {
  let { userData } = await fetch(
    `http://localhost:8000/getUser/?userId=${localStorage.getItem("user_id")}`
  ).then((data) => data.json());
  userData = userData[0];
  if (userData.adminAccess) {
    return "admin";
  } else {
    return localStorage.getItem("user_id");
  }
};

const addBookAccess = async (record) => {
  const obj = {
    price: 0,
    id: record._id,
  };
  const response = await fetch(
    `http://127.0.0.1:8000/purchaseBook/?bookData=${JSON.stringify(
      obj
    )}&&userId=${localStorage.getItem("user_id")}`,
    {
      method: "post",
    }
  ).then((data) => data.json());
  console.log(response);
};

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
