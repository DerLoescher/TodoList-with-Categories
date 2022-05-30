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
        console.log(response.status);
        state.categories.push(response.data);
        // это не работает,
        // раз обновляется страница и просто вызывается гет запрос
      }
    },
    categoryHasBeenDeleted(state, response) {
      if (199 < response < 300) {
        state.categories = state.categories.filter(
          (item) => item !== state.selectedCategory
        );
      }
    },
    categorySelected(state, category) {
      state.selectedCategory = category;
    },
    categorySelectedByDefault(state) {
      state.selectedCategory = state.categories[0];
    },

    setTasks(state, data) {
      state.tasks = data;
    },
    newTaskWasCreated(state, response) {
      if (199 < response.status < 300) {
        state.tasks.push(response.data);
      }
    },
    taskHasBeenDeleted(state, task, response) {
      if (199 < response.status < 300) {
        state.tasks = state.tasks.filter((item) => item !== task);
      }
    },
    taskConditionChanged(state, response, task) {
      if (199 < response < 300) {
        task.isDone = !task.isDone;
      }
    },

    tasksInCategoryCleared(state, response) {
      if (199 < response < 300) {
        state.tasks = state.tasks.filter(
          (item) => item.categoryId !== this.state.selectedCategory.id
        );
      }
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
      commit("taskConditionChanged", await Api.changeTaskCondition(task));
    },

    async clearTasksInCategory({ commit }) {
      commit(
        "tasksInCategoryCleared",
        await Api.clearTasksInCategory(this.state.selectedCategory.id)
      );
    },
  },
});

export default store;
