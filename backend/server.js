const express = require('express');
const connectDB = require('./config/dbConnection');
const app = express();
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');

connectDB();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/users",require("./routes/userRoutes"));

app.use("/api/blogs",require("./routes/blogRoutes"));

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})