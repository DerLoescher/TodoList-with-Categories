import AxiosOrigin from "axios";

const axios = AxiosOrigin.create({
  baseURL: "https://bigtodo-server.herokuapp.com",
});

export default axios;
