<template>
  <ul class="task_list">
    <li
      v-for="task in tasks"
      :key="task"
      class="task_box"
      @click="task.isDone = !task.isDone"
    >
      <div class="task_number">Task #{{ task.idx }}</div>
      <div class="task_info">
        <input class="checkbox" type="checkbox" v-model="task.isDone" />
        <span :class="{ task_is_done: task.isDone }" class="task_name">{{
          task.name
        }}</span>
        <button
          class="delete_button"
          @click="this.$emit('taskHasBeenDeleted', task)"
        >
          <img class="delete_svg" src="../../assets/delete.svg" alt="X" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TaskList",
  props: {
    tasks: Array,
  },
};
</script>

<style scoped>
.group_selector {
  width: 50%;
}
.task_list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-top: 10%;
}
@media screen and (max-width: 700px) {
  .task_list {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 450px) {
  .task_list {
    grid-template-columns: 1fr;
  }
}
.task_box {
  width: 150px;
  height: 100px;
}
.task_box:hover {
  padding: 2px;
  background: black;
  border-radius: 0 12px 12px 0;
  cursor: pointer;
}
.task_number {
  background: white;
  color: black;
  width: 100%;
  height: 30%;
  border-radius: 0px 10px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.task_info {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 70%;
  background: #666;
  border-radius: 0px 0px 10px 0px;
}
.checkbox {
  height: 30px;
  width: 30px;
}
.task_name {
  font-size: 20px;
}
.task_is_done {
  text-decoration: line-through;
  color: gray;
}
.delete_button {
  height: 30px;
  width: 30px;
  background: transparent;
  border-color: transparent;
}
.delete_button:hover,
.delete_button:active {
  background: white;
  border-radius: 20px;
}
.delete_svg {
  height: 100%;
  width: 100%;
}
</style>