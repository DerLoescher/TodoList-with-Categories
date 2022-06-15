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
    const { status } = await axios.delete(`/categories/${categoryID}`);
    return status;
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
    const { status } = await axios.delete(`/tasks/${task.id}`);
    return status;
  }
  async changeTaskCondition(task) {
    const response = await axios.patch(`/tasks/${task.id}`, {
      isDone: !task.isDone,
    });
    return response;
  }

  async clearTasksInCategory(tasksId) {
    tasksId.forEach(async function (taskId) {
      await axios.delete(`/tasks/${taskId}`);
    });
  }
}

export default new Api();
