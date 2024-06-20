require("dotenv").config();
const PORT = 9000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const HandleError = require("./utils/ExpressError");
const http = require("http").createServer(app);

//cors
app.use(
  cors({
    origin: ["http://localhost:3000", "https://getgeeks.onrender.com/Blogs"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
const API = require("./routes/scraper.js");

app.use("/", API);
app.get("/test", (req, res) => {
  res.send({ success: true, data: "Test successfull !!" });
});

//Error Handlers
app.all("*", (req, res, next) => {
  next(new HandleError("Page not Found", 404));
});

app.use((err, req, res, next) => {
  const { message = "Some Error Occured", statusCode = 404 } = err;
  res.send({ success: false, msg: message });
});

http.listen(PORT, () => {
  console.log(`${process.env.BASE_URL}:${PORT}/find`);
});
