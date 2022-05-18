import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      categories: [{ name: "main", color: "black", tasks: [] }],
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
    },
  },
  actions: {},
});

export default store;
