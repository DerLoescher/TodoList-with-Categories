<template>
  <div class="task_input">
    <input
      type="text"
      class="input_data"
      v-model="taskName"
      @keydown.enter="addNewTask"
      autofocus
    />
    <button class="add_button" @click="addNewTask">ADD</button>
  </div>
</template>
    
<script>
export default {
  name: "InputTask",
  data() {
    return {
      taskName: "",
    };
  },
  methods: {
    addNewTask() {
      this.$emit("newTaskHasBeenAdded", this.taskName);
      this.taskName = "";
    },
  },
};
</script>

<style scoped>
.task_input {
  width: 400px;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  background: linear-gradient(180deg, #dacfcf 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(180deg, #c947c2 0%, rgba(255, 255, 255, 0) 100%), #48c4e6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
@media screen and (max-width: 550px) {
  .task_input {
    width: 100%;
  }
}
.input_data {
  height: 30px;
  width: 50%;
  display: flex;
  flex-direction: column;
}
.add_button {
  height: 100%;
  width: 20%;
  background: transparent;
  border-color: #ff207c;
  border-radius: 20px;
}
.add_button:hover {
  background: #ff207c;
}
.add_button:active {
  border-color: #48c4e6;
}
</style>