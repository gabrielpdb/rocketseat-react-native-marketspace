import axios, { AxiosInstance } from "axios"

type APIInstanceProps = AxiosInstance & {}

const api = axios.create({
  baseURL: "http://10.0.0.103:3333",
}) as APIInstanceProps

export { api }
