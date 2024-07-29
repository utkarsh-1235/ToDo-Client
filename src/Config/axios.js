import axios from "axios";

export default axios.create({
  baseURL: 'http://localhost:4000',
  // "http://localhost:3500",

  headers: { "Content-Type": "application/json" },
});
