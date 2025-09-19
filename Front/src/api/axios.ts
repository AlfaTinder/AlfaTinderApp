import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // измени на свой backend URL
  withCredentials: true, // если backend использует cookie для авторизации
});

export default instance;
