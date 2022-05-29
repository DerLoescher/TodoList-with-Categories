import axios from "./axios";

class Api {
  async getCategories() {
    const { data } = await axios.get("/categories");
    return data;
  }
  async getTasks() {
    const { data } = await axios.get("/tasks");
    return data;
  }
  async postTask(task) {
    await axios.post("/tasks", task);
  }
  async postCategory(category) {
    await axios.post("/categories", category);
  }
  async deleteCategory(categoryID) {
    await axios.delete(`/categories/${categoryID}`);
  }
}

export default new Api();
