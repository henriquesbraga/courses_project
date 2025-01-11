require('dotenv').config()
import express, { Request, Response } from "express";
import "./database/initialize-database"
import router from "./router";

const server = express();
server.use(express.json());
server.use(router);


server.listen(3000, () => {
  console.log("Server is running on port 3000");
});