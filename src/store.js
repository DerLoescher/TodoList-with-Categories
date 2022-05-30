import { createStore } from "vuex";
import Api from "./api";

const store = createStore({
  state() {
    return {
      categories: [],
      tasks: [],
      selectedCategory: {},
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
      state.selectedCategory = state.categories[0];
    },
    newCategoryWasCreated(state, response) {
      if (199 < response.status < 300) {
        state.categories.push(response.data);
        state.selectedCategory = state.categories.find(
          (item) => item.id == response.data.id
        );
      }
    },
    categoryHasBeenDeleted(state, response) {
      if (199 < response < 300) {
        state.categories = state.categories.filter(
          (item) => item !== state.selectedCategory
        );
        state.selectedCategory = state.categories[0];
      }
    },
    categorySelected(state, category) {
      state.selectedCategory = category;
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

    tasksInCategoryCleared(state) {
      state.tasks = state.tasks.filter(
        (item) => +item.categoryId !== state.selectedCategory.id
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
    async delCategory({ commit }) {
      commit(
        "categoryHasBeenDeleted",
        await Api.deleteCategory(this.state.selectedCategory.id)
      );
    },

    async getTasks({ commit }) {
      commit("setTasks", await Api.getTasks());
    },
    async addNewTask({ commit }, task) {
      commit(
        "newTaskWasCreated",
        await Api.postTask(task, this.state.selectedCategory.id)
      );
    },
    async delTask({ commit }, task) {
      commit("taskHasBeenDeleted", task, await Api.deleteTask(task));
    },
    async changeTaskCondition({ commit }, task) {
      commit("taskConditionChanged", await Api.changeTaskCondition(task), task);
    },

    async clearTasksInCategory({ commit }) {
      const tasksId = this.state.tasks
        .filter((item) => item.categoryId == this.state.selectedCategory.id)
        .map((item) => (item = item.id));
      await Api.clearTasksInCategory(tasksId);
      commit("tasksInCategoryCleared", tasksId);
    },
  },
});

export default store;
