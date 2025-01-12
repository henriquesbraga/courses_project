require('dotenv').config()
import express, { Request, Response } from "express";
import "./database/initialize-database"
import router from "./router";
import cors from "cors";



const server = express();
server.use(cors({
  origin: [
    "http://localhost:5173"
  ]
}))
server.use(express.json());
server.use(router);


server.listen(3000, () => {
  console.log("Server is running on port 3000");
});