const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection
connectDB();

//rest objecct
const app = express();

//middelwares
app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  credentials: true, // Allow cookies
}));
app.use(cookieParser());
app.use(express.json());

// app.use(morgan("dev"));

// //routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

// Port
const PORT = process.env.PORT || 8000;
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV} mode port no ${PORT}`
  );
});