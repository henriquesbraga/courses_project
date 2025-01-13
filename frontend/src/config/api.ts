import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 15000,
  headers: {
    "Content-Type":  "application/json",
    "Accept":  "application/json"
  }
})