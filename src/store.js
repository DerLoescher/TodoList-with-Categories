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
  },
  actions: {},
});

export default store;
