<template>
  <TodoMain />
</template>

<script>
import TodoMain from "./components/Main.vue";

export default {
  name: "App",
  components: {
    TodoMain,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
</style>
