const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 4000;

// middleware
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
app.use(express.json());



const dbConnect = require("./config/database");
dbConnect();


const course = require("./routes/course");

app.use("/course"  ,course);

app.listen(PORT, () => {
  console.log("app start at port 4000");
});

app.get("/", (req, res) => {
  res.send("this is an get app");
});



// done till 51 minutes of 4th video 