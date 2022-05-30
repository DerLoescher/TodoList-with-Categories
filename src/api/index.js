import axios from "./axios";

class Api {
  async getCategories() {
    const { data } = await axios.get("/categories");
    return data;
  }
  async postCategory(category) {
    const response = await axios.post("/categories", category);
    return response;
  }
  async deleteCategory(categoryID) {
    await axios.delete(`/categories/${categoryID}`);
  }

  async getTasks() {
    const { data } = await axios.get("/tasks");
    return data;
  }
  async postTask(task, categoryId) {
    const response = await axios.post(`/categories/${categoryId}/tasks`, task);
    return response;
  }
  async deleteTask(task) {
    const response = await axios.delete(`/tasks/${task.id}`);
    return response;
  }
  async changeTaskCondition(task) {
    await axios.patch(`/tasks/${task.id}`, { isDone: !task.isDone });
  }

  async clearTasksInCategory(categoryId) {
    await axios.delete(`/tasks?categoryId=${categoryId}`);
  }
}

export default new Api();
