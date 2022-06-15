import { createStore } from "vuex";
import Api from "./api";

const store = createStore({
  state() {
    return {
      categories: [],
      tasks: [],
      colors: [
        "red",
        "orange",
        "yellow",
        "green",
        "lightblue",
        "blue",
        "purple",
      ],
    };
  },
  mutations: {
    setCategories(state, data) {
      state.categories = data;
    },
    newCategoryWasCreated(state, response) {
      if (199 < response.status < 300) {
        state.categories.push(response.data);
      }
    },
    categoryHasBeenDeleted(state, categoryId, status) {
      if (199 < status < 300) {
        state.categories = state.categories.filter(
          (item) => item.id !== categoryId
        );
      }
    },

    setTasks(state, data) {
      state.tasks = data;
    },
    newTaskWasCreated(state, response) {
      if (199 < response.status < 300) {
        state.tasks.push(response.data);
      }
    },
    taskHasBeenDeleted(state, task, status) {
      if (199 < status < 300) {
        state.tasks = state.tasks.filter((item) => item.id !== task.id);
      }
    },
    taskConditionChanged(state, response) {
      if (199 < response.status < 300) {
        state.tasks.forEach((item) =>
          item.id == response.data.id
            ? (item.isDone = response.data.isDone)
            : false
        );
      }
    },

    tasksInCategoryCleared(state, categoryId) {
      state.tasks = state.tasks.filter(
        (item) => +item.categoryId !== categoryId
      );
    },
  },
  actions: {
    async getCategories({ commit }) {
      commit("setCategories", await Api.getCategories());
    },
    async addNewCategory({ commit }, newCategory) {
      commit("newCategoryWasCreated", await Api.postCategory(newCategory));
    },
    async delCategory({ commit }, categoryId) {
      commit(
        "categoryHasBeenDeleted",
        categoryId,
        await Api.deleteCategory(categoryId)
      );
    },

    async getTasks({ commit }) {
      commit("setTasks", await Api.getTasks());
    },
    async addNewTask({ commit }, data) {
      console.log(data[1]);
      commit("newTaskWasCreated", await Api.postTask(data[0], data[1]));
    },
    async delTask({ commit }, task) {
      commit("taskHasBeenDeleted", task, await Api.deleteTask(task));
    },
    async changeTaskCondition({ commit }, task) {
      commit("taskConditionChanged", await Api.changeTaskCondition(task), task);
    },

    async clearTasksInCategory({ commit }, categoryId) {
      const tasksId = this.state.tasks
        .filter((item) => item.categoryId == categoryId)
        .map((item) => (item = item.id));
      await Api.clearTasksInCategory(tasksId);
      commit("tasksInCategoryCleared", categoryId);
    },
  },
});

export default store;
