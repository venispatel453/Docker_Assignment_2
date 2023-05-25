require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const route = require("./routes/route");
const connectDB = require("./db/connect");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const socket = require("socket.io");
const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: "rzp_test_ypUiJhAYzxNIKU",
  key_secret: "bZvuwOiIBGVjsymGpP6OOa83",
});

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieparser());
app.use(cors());
app.use(express.static("public"));
// app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log(req.file);
  res.render("home.ejs");
});

app.use("/", route);
// app.listen(8000, () => {
//   console.log("connected");
// });

app.post("/create/orderID", (req, res) => {
  console.log(typeof parseInt(req.body.amount), req.body.amount);
  var options = {
    amount: Number(req.body.amount), // for dynamic write Number("req.body.amt") amount in the smallest currency unit
    currency: "INR",
    receipt: "Recipt for Payment Success",
  };
  console.log(options);
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send({ orderID: order.id });
  });
});

app.post("/api/payment/verify", (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", "bZvuwOiIBGVjsymGpP6OOa83")
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", req.body.response.razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var response = { signatureIsValid: "false" };
  if (expectedSignature === req.body.response.razorpay_signature)
    response = { signatureIsValid: "true" };
  res.send(response);
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    const server = app.listen(8000, () => {
      console.log("connected");
    });
    chatServer(server);
  } catch (error) {
    console.log(error);
  }
};
start();

const chatServer = (server) => {
  const io = socket(server);

  // global.onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("connection established here");
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg received", data.msg);
      }
    });
    console.log("connection established");
    socket.on("updateChat", (data) => {
      //console.log("hey")
      console.log(data);
      io.emit("updateChat", data);
    });
  });
};
