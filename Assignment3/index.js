const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
console.log("Node DNS servers:", dns.getServers());

const express = require("express");

const connectDB = require("./db");

const app = express() ;

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database Connection Error:", err);
  });
