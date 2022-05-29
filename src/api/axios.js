import AxiosOrigin from "axios";

const axios = AxiosOrigin.create({
  baseURL: "http://localhost:3001",
});

export default axios;
