require('dotenv').config()
import express, { Request, Response } from "express";
import "./database/initialize-database"
import router from "./router";
import cors from "cors";

const server = express();
server.use(cors({
  origin: [
    "http://localhost:3000"
  ]
}))
server.use(express.json());
server.use(router);


server.listen(4000, () => {
  console.log(" Backend server is running on port 4000");
});