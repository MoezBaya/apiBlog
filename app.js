const express = require("express");
const connectToDb = require("./config/connectToDb");
const { errorHandler, notFound } = require("./middlewares/error");
const auth = require('./routes/authRoute');
const cors = require('cors');
require("dotenv").config();

// Connection To Db
connectToDb();

// init app
const app = express();

// Middlewares
app.use(express.json());

// Cors Policy
app.use(cors({
    origin: "http://localhost:3000"
}))

// Routes
app.use("/api/auth", auth);
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/comments", require("./routes/commentRoute"));
app.use("/api/categories", require("./routes/categoriesRoute"));

// Error Handler
app.use(notFound);
app.use(errorHandler);

// Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))