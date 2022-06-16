<template>
  <ul class="task_list">
    <li v-for="(task, idx) in tasks" :key="idx" class="task_box">
      <div
        class="shadow_box"
        @click="this.$store.dispatch('changeTaskCondition', task)"
      ></div>
      <div class="task_number">Task #{{ idx + 1 }}</div>
      <div class="task_info">
        <input class="checkbox" type="checkbox" v-model="task.isDone" />
        <span :class="{ task_is_done: task.isDone }" class="task_name">{{
          task.name
        }}</span>
        <button
          class="delete_button"
          @click="this.$store.dispatch('delTask', task)"
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
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2%;
}
.task_box {
  width: 100%;
  height: 45px;
  margin-bottom: 5px;
}
.shadow_box {
  position: relative;
  margin-bottom: -50px;
  width: 100%;
  height: 50px;
  z-index: 5;
}
.task_box:hover {
  padding: 2px;
  background: black;
  border-radius: 0 12px 12px 0;
  cursor: pointer;
}
.task_number {
  padding-left: 5px;
  background: white;
  color: black;
  width: 100%;
  height: 30%;
  border-radius: 0px 10px 0px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.task_info {
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
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
  z-index: 5;
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
@media screen and (max-width: 770px) {
  .task_box {
    width: 100%;
    height: 60px;
    margin-bottom: 8px;
  }
}
</style>