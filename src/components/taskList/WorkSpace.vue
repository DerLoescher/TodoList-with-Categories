<template>
  <section class="work_space">
    <div class="burger_button" @click="openCategoryTab">
      <div class="bar1" :class="{ change_bar1: tabIsSeen }"></div>
      <div class="bar2" :class="{ change_bar2: tabIsSeen }"></div>
      <div class="bar3" :class="{ change_bar3: tabIsSeen }"></div>
    </div>
    <div class="category_settings">
      <p class="category_name">{{ category.name.toUpperCase() }}</p>
      <div class="opts_btns">
        <button
          class="cat_opts_btn"
          v-if="category.color !== 'white'"
          @click="deleteCategory"
        >
          delete category
        </button>
        <button
          class="cat_opts_btn"
          @click="this.$store.dispatch('clearTasksInCategory', category.id)"
        >
          clear tasks
        </button>
      </div>
    </div>
    <InputTask @newTaskHasBeenAdded="pushTaskIntoList" />
    <TaskList :tasks="this.selectedTasks" />
    <div class="page_nav">
      <button class="page_btn" v-if="page > 1" @click="page = +page - 1">
        Назад
      </button>
      <button
        class="page_btn"
        :class="{ page_btn_forw: page == 1 }"
        v-if="hasNextPage"
        @click="page = +page + 1"
      >
        Вперед
      </button>
    </div>
  </section>
</template>
<script>
import InputTask from "./InputTask.vue";
import TaskList from "./TaskList.vue";

export default {
  name: "WorkSpace",
  data() {
    return {
      page: 1,
    };
  },
  components: {
    InputTask,
    TaskList,
  },
  props: {
    categoryId: { type: Number, required: true },
    tabIsSeen: Boolean,
  },
  methods: {
    pushTaskIntoList(taskName) {
      this.$store.dispatch("addNewTask", [
        {
          name: taskName,
          isDone: false,
        },
        this.categoryId,
      ]);
    },
    deleteCategory() {
      this.$store.dispatch("delCategory", this.category.id);
      this.$router.replace(`/${1}/general`);
    },
    // нужно подумать на какую страницу лучше перекидывать после удаления категории
    openCategoryTab() {
      this.burgerClicked = !this.burgerClicked;
      this.$emit("showCategoryTab");
    },
  },
  computed: {
    category() {
      return this.$store.state.categories.find(
        (category) => category.id === this.categoryId
      );
    },
    startIndex() {
      return (this.page - 1) * 8;
    },
    endIndex() {
      return this.page * 8;
    },
    selectedTasks() {
      let tasks = this.$store.state.tasks.filter(
        (item) => item.categoryId == this.category.id
      );
      return tasks.slice(this.startIndex, this.endIndex);
    },
    hasNextPage() {
      return this.$store.state.tasks.length > this.endIndex;
    },
  },
};
</script>

<style scoped>
.work_space {
  width: 100%;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #212121;
}
.burger_button {
  position: absolute;
  left: 2%;
  top: 2%;
  display: none;
  z-index: 15;
}
.bar1,
.bar2,
.bar3 {
  width: 35px;
  height: 5px;
  background-color: rgb(226, 209, 209);
  margin: 6px 0;
  transition: 0.4s;
}
.change_bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
  width: 46px;
}
.change_bar2 {
  opacity: 0;
}
.change_bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
  width: 46px;
}
@media screen and (max-width: 770px) {
  .work_space {
    min-height: 100vh;
  }
  .burger_button {
    display: block;
  }
}

.category_settings {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0 10% 0;
}
.category_name {
  font-size: 30px;
  font-weight: 600;
}
.cat_opts_btn {
  height: 20px;
  width: 100px;
  color: black;
}
.opts_btns {
  width: 250px;
  display: flex;
  justify-content: space-evenly;
}
@media screen and (max-width: 350px) {
  .opts_btns {
    flex-direction: column;
    align-items: center;
  }
}
.page_nav {
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: space-between;
  width: 120px;
}
.page_btn {
  border-radius: 7px;
  width: 50px;
  height: 30px;
  background-color: white;
  color: black;
}
.page_btn_forw {
  margin-left: 70px;
}
</style>