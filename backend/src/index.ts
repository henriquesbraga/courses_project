require('dotenv').config()
import express, { Request, Response } from "express";
import "./database/initialize-database"




const server = express();




server.listen(3000, () => {
  console.log("Server is running on port 3000");
});




