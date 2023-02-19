require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/index");
const middleWareError = require("../server/middleweares/middleError");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(middleWareError);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`started on ${PORT}!!`));
  } catch (e) {
    console.log(e);
  }
};
start();
