import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      categories: [],
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
    newCategoryWasCreated(state, category) {
      state.categories.push(category);
      state.selectedCategory = category;
    },
    categorySelected(state, category) {
      state.selectedCategory = category;
    },
    pushTaskIntoList(state, taskName) {
      state.selectedCategory.tasks.push({
        name: taskName,
        isDone: false,
        idx: +state.selectedCategory.taskNumeration,
      });
      +state.selectedCategory.taskNumeration++;
    },
    taskHasBeenDeleted(state, task) {
      state.selectedCategory.tasks = state.selectedCategory.tasks.filter(
        (t) => t !== task
      );
    },
    deleteCategory(state) {
      state.categories = state.categories.filter(
        (item) => item !== state.selectedCategory
      );
      state.selectedCategory = state.categories.find(
        (item) => item.color == "white"
      );
    },
    clearTasks(state) {
      state.selectedCategory.tasks = [];
    },
  },
  actions: {},
});

export default store;
