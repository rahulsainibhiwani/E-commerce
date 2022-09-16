import axios from "axios";

const httpGet = axios.create({
  baseURL: "http://localhost:5911",
  headers: {
    secret_key: "sk_4A7oyXeG+mTsTu2fXE97v1MMJidISag13/zXUTf7Ms/qp2uz",
    publish_key: "pk_lu5uK0LZUchv8JUcCF6PYIoLwrynYYFIPEE0ZsXocnITLFkv",
  },
});
const httpPost = axios.create({
  baseURL: "http://localhost:5911",
  headers: {
    "Content-Type": "application/json",
    secret_key: "sk_4A7oyXeG+mTsTu2fXE97v1MMJidISag13/zXUTf7Ms/qp2uz",
    publish_key: "pk_lu5uK0LZUchv8JUcCF6PYIoLwrynYYFIPEE0ZsXocnITLFkv",
  },
});
export { httpGet, httpPost };
