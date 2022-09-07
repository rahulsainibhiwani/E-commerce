import axios from "axios";

const httpGet = axios.create({
  baseURL: "http://localhost:5911",
});
const httpPost = axios.create({
  baseURL: "http://localhost:5911",
  headers:{
    "Content-Type":"application/json",
  }
});
export { httpGet ,httpPost};
