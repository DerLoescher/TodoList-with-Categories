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
    newCategoryWasCreated(state, response, category) {
      if (199 < response < 300) {
        state.categories.push(category);
      }
    },
    categorySelected(state, category) {
      state.selectedCategory = category;
    },
    pushTaskIntoList(state, task) {
      state.selectedCategory.tasks.push(task);
      +state.selectedCategory.taskNumeration++;
    },
    taskHasBeenDeleted(state, task) {
      state.selectedCategory.tasks = state.selectedCategory.tasks.filter(
        (t) => t !== task
      );
    },
    deleteCategory(state, response) {
      if (199 < response < 300) {
        state.categories = state.categories.filter(
          (item) => item !== state.selectedCategory
        );
      }
    },
    clearTasks(state) {
      state.selectedCategory.tasks = [];
    },
    setCategories(state, data) {
      state.categories = data;
    },
  },
  actions: {
    async getCategories({ commit }) {
      commit("setCategories", await Api.getCategories());
    },
    async addNewCategory({ commit }, newCategory) {
      commit(
        "newCategoryWasCreated",
        await Api.postCategory(newCategory),
        newCategory
      );
    },
    async delCategory({ commit }) {
      commit(
        "deleteCategory",
        await Api.deleteCategory(this.state.selectedCategory.id)
      );
    },
  },
});

export default store;
