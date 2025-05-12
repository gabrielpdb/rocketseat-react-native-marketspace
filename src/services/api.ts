import axios, { AxiosInstance } from "axios"

type APIInstanceProps = AxiosInstance & {}

const api = axios.create({
  baseURL: "http://192.168.0.101:3333",
}) as APIInstanceProps

export { api }
