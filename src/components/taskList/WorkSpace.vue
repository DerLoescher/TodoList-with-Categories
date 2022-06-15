<template>
  <section class="work_space">
    <div class="category_settings">
      <p>{{ category.name }}</p>
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
  </section>
</template>
<script>
import InputTask from "./InputTask.vue";
import TaskList from "./TaskList.vue";

export default {
  name: "WorkSpace",
  components: {
    InputTask,
    TaskList,
  },
  props: {
    categoryId: { type: Number, required: true },
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
      this.$router.replace(`/${this.category.id - 1}`);
    },
  },
  computed: {
    selectedTasks() {
      let tasks = this.$store.state.tasks.filter(
        (item) => item.categoryId == this.category.id
      );
      return tasks;
    },
    category() {
      return this.$store.state.categories.find(
        (category) => category.id === this.categoryId
      );
    },
  },
};
</script>

<style scoped>
.work_space {
  width: 100%;
  padding: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #212121;
}
@media screen and (max-width: 770px) {
  .work_space {
    min-height: 100vh;
  }
}
.category_settings {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5% 0 20% 0;
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
</style>