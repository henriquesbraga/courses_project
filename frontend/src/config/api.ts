import axios from "axios";



const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://courseproject.henriquelabs.com.br/api/'
    : 'http://localhost:4000';


export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type":  "application/json",
    "Accept":  "application/json"
  }
})