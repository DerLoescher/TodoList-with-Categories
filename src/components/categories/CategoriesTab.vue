<template>
  <header
    class="tab_header"
    :class="{ tab_header_uncommon: this.categories.length > 13 }"
  >
    <nav class="category_wrapper">
      <ul style="height: 100%">
        <button class="new_cat_btn" @click="this.$emit('openModal')">
          Create a new category
        </button>
        <router-link
          class="router_link"
          v-for="category in categories"
          :key="category.id"
          :to="{
            name: 'category.name',
            params: { id: category.id, slug: category.slug },
          }"
          @click="this.$emit('closeTab')"
        >
          <li
            class="category"
            :class="{
              category_active: this.$route.params.id == category.id,
            }"
          >
            <span
              :style="{ background: `${category.color}` }"
              class="circle"
            ></span>
            <span>{{ category.name }}</span>
          </li></router-link
        >
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "CategoriesTab",
  data() {
    return {};
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  beforeCreate() {
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getTasks");
  },
};
</script>

<style scoped>
.tab_header {
  background: #282828;
  color: white;
  box-shadow: 0px 10px 10px rgba(1, 1, 1, 0.25);
  height: 100vh;
  width: 25vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tab_header_uncommon {
  height: 100%;
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

.router_link {
  text-decoration: none;
}
.category {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.category:hover {
  background: rgb(139, 139, 139);
  cursor: pointer;
}
.category:active {
  background: #666;
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
@media screen and (max-width: 770px) {
  .category_wrapper {
    padding-top: 70px;
  }
  .new_cat_btn {
    top: 2%;
    left: 80px;
    width: 50%;
    height: 40px;
    position: absolute;
  }
}
</style>