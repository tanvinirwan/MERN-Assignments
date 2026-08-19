const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("Node DNS servers:", dns.getServers());


const express = require("express");

const connectDB = require("./db");

const reviewRouter = require("./src/routes/reviewRoute");

const {
    notFound,
    errorHandler
} = require("./src/middlewares/errorHandler");


const app = express();


app.use(express.json());


// Routes
app.use("/reviews", reviewRouter);


// 404 handler
app.use(notFound);


// Central error handler
app.use(errorHandler);


connectDB()
    .then(() => {

        app.listen(3000, () => {

            console.log("Server running on port 3000");

        });

    })
    .catch((err) => {

        console.log("Database Connection Error:", err);

    });