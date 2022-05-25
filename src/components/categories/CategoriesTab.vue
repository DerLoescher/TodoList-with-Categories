<template>
  <header class="tab_header">
    <nav>
      <ul class="category_wrapper">
        <button class="new_cat_btn" @click="this.$emit('openModal')">
          Create a new category
        </button>
        <li
          class="category"
          :class="{
            category_active: this.$store.state.selectedCategory == category,
          }"
          v-for="(category, index) in this.$store.state.categories"
          :key="`${category}_${index}`"
          @click="this.$store.commit('categorySelected', category)"
        >
          <span
            :style="{ background: `${category.color}` }"
            class="circle"
          ></span>
          <span>{{ category.name }}</span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "CategoriesTab",
  data() {
    return {
      selectedCategory: null,
    };
  },
  created() {
    this.$store.commit("newCategoryWasCreated", {
      tasks: [],
      name: "main",
      color: "white",
      taskNumeration: 1,
    });
  },
};
</script>

<style scoped>
.tab_header {
  background: #282828;
  color: white;
  box-shadow: 0px 10px 10px rgba(1, 1, 1, 0.25);
  height: 100vh;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.category_wrapper {
  width: 100%;
}
.new_cat_btn {
  border-radius: 5px;
  height: 30px;
  width: 100%;
  color: #282828;
}
.category {
  height: 60px;
  width: 250px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.category:hover {
  font-weight: bolder;
  cursor: pointer;
}
.category:active {
  opacity: 60%;
}
.category_active {
  background: #666;
}
.circle {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 20px;
}
</style>