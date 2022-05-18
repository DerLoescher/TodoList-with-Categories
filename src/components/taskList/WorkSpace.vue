<template>
  <section class="work_space">
    <InputTask @newTaskHasBeenAdded="pushTaskIntoList" />
    <div>
      <TaskList :tasks="this.taskPool" @taskHasBeenDeleted="deleteTask" />
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
      taskPool: [],
      taskNumber: 1,
    };
  },
  components: {
    InputTask,
    TaskList,
  },
  methods: {
    pushTaskIntoList(taskName) {
      this.taskPool.push({
        name: taskName,
        isDone: false,
        idx: this.taskNumber,
      });
      this.taskNumber++;
    },
    deleteTask(task) {
      this.taskPool = this.taskPool.filter((t) => t !== task);
    },
  },
};
</script>

<style scoped>
.work_space {
  width: 80%;
  padding: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>