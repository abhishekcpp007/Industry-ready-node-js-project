const express = require("express");
const serverConfig = require("./configs/server.config");
const mongoose = require("mongoose");
const dbConfig = require('./configs/db.config');
const userModel = require('./models/user.model');
const app = express();

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to DB");
});

db.once("open", async () => {
  console.log("Db is connected");
  await init();
});

async function init() {
  // Initialize the mongo db 
  // need to create the ADMIN 
  const admin = await userModel.create({
    name: "Abhishek verma",
    userId: "admin",
    email: "abhishekverma800900@gmail.com",
    userType: "ADMIN",
    password: "welcome"
  });
  console.log(admin);
}

app.listen(serverConfig.PORT, () => {
  console.log(`Server started on the port number ${serverConfig.PORT}`);
});
