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
        <button class="cat_opts_btn" @click="this.$store.commit('clearTasks')">
          clear tasks
        </button>
      </div>
    </div>
    <InputTask @newTaskHasBeenAdded="pushTaskIntoList" />
    <div>
      <TaskList
        :tasks="this.$store.state.selectedCategory.tasks"
        @taskHasBeenDeleted="deleteTask"
      />
    </div>
  </section>
</template>
<script>
import InputTask from "./InputTask.vue";
import TaskList from "./TaskList.vue";
import Api from "../../api";

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
    async pushTaskIntoList(taskName) {
      await Api.postTask({
        name: taskName,
        isDone: false,
      });
      this.$store.commit("pushTaskIntoList", {
        name: taskName,
        isDone: false,
      });
    },
    deleteTask(task) {
      this.$store.commit("taskHasBeenDeleted", task);
    },
  },
  computed: {
    taskPool() {
      return [];
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