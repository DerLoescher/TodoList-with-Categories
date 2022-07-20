import AxiosOrigin from "axios";

const axios = AxiosOrigin.create({
  baseURL: "https://todolist-with-categories.herokuapp.com/api",
});

export default axios;
