<template>
  <section class="work_space">
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
      this.$store.commit("pushTaskIntoList", taskName);
    },
    deleteTask(task) {
      this.taskPool = this.taskPool.filter((t) => t !== task);
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
  padding: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #212121;
}
</style>