import AxiosOrigin from "axios";

const axios = AxiosOrigin.create({
  baseURL: "http://localhost:3003",
});

export default axios;
