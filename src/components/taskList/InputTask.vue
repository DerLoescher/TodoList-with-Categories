<template>
  <div class="task_input">
    <input
      type="text"
      class="input_data"
      v-model="taskName"
      @keydown.enter="addNewTask"
      autofocus
      maxlength="50"
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
      if (this.taskName !== "") {
        this.$emit("newTaskHasBeenAdded", this.taskName);
        this.taskName = "";
      } else return;
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
  background: #666;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
@media screen and (max-width: 550px) {
  .task_input {
    width: 100%;
  }
}
.input_data {
  background: #212121;
  border-color: black;
  height: 30px;
  width: 50%;
  display: flex;
  flex-direction: column;
}
.input_data:focus {
  outline: none;
  border: 1px rgb(37, 106, 218) solid;
}
.add_button {
  height: 100%;
  width: 20%;
  background: transparent;
  border-color: black;
  border-radius: 20px;
}
.add_button:hover {
  background: rgb(142, 142, 142);
  cursor: pointer;
}
.add_button:active {
  border-color: white;
}
</style>