<template>
  <section class="work_space">
    <div class="category_settings">
      <h1>{{ this.$store.state.selectedCategory.name }}</h1>
      <div class="opts_btns">
        <button
          class="cat_opts_btn"
          v-if="this.$store.state.selectedCategory.color !== 'white'"
          @click="this.$store.dispatch('delCategory')"
        >
          delete category
        </button>
        <button
          class="cat_opts_btn"
          @click="this.$store.dispatch('clearTasksInCategory')"
        >
          clear tasks
        </button>
      </div>
    </div>
    <InputTask @newTaskHasBeenAdded="pushTaskIntoList" />
    <div>
      <TaskList :tasks="selectedTasks" />
    </div>
  </section>
</template>
<script>
import InputTask from "./InputTask.vue";
import TaskList from "./TaskList.vue";

export default {
  name: "WorkSpace",
  data() {
    return {};
  },
  components: {
    InputTask,
    TaskList,
  },
  methods: {
    pushTaskIntoList(taskName) {
      this.$store.dispatch("addNewTask", {
        name: taskName,
        isDone: false,
      });
    },
  },
  computed: {
    selectedTasks() {
      let tasks = this.$store.state.tasks.filter(
        (item) => item.categoryId == this.$store.state.selectedCategory.id
      );
      return tasks;
    },
  },
};
</script>

<style scoped>
.work_space {
  width: 100%;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #212121;
}
.category_settings {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
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