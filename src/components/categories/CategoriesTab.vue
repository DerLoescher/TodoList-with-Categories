<template>
  <header class="tab_header">
    <nav>
      <ul>
        <button @click="this.$emit('openModal')">Create a new category</button>
        <li
          class="category"
          v-for="(category, index) in this.$store.state.categories"
          :key="`${category}_${index}`"
          @click="this.$emit('categorySelected', category)"
        >
          <span :style="{ color: `${category.color}` }">Color</span>
          <span>{{ category.name }}</span>
        </li>
        <!-- <form>
          <div
            class="form_radio_btn"
            v-for="(category, index) in this.$store.state.categories"
            :key="`${category}_${index}`"
          >
            <input v-model="this.selectedCategory" type="radio" name="radio" />
            <label for="radio">{{ category.name }}{{ category.color }}</label>
          </div>
        </form> -->
      </ul>
      {{ this.selectedCategory }}
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
  methods: {
    addCategory() {
      this.categories.push(this.categoryName);
      this.categoryName = "";
    },
  },
};
</script>

<style scoped>
.tab_header {
  background: linear-gradient(180deg, #dacfcf 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(180deg, #c947c2 0%, rgba(255, 255, 255, 0) 100%), #48c4e6;
  box-shadow: 0px 10px 10px rgba(1, 1, 1, 0.25);
  height: 100vh;
  width: 20%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.category:hover {
  font-weight: bolder;
  cursor: pointer;
}
.category:active {
  opacity: 60%;
}
</style>