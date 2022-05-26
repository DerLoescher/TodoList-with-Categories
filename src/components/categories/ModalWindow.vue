<template>
  <div class="shadow_back">
    <div class="click_away" @click="this.$emit('closeModal')"></div>
    <div class="modal_wrapper">
      <button @click="this.$emit('closeModal')" class="close_button">
        close
      </button>
      <div class="modal_form">
        <input
          class="input_task"
          type="text"
          v-model="newCategory.name"
          autofocus
        />
        <form>
          <div class="radio_btns">
            <div v-for="color in this.$store.state.colors" :key="color">
              <input
                type="radio"
                v-bind:value="color"
                v-model="newCategory.color"
              />
              <label>{{ color }}</label>
            </div>
          </div>
        </form>
        <button class="send_btn" @click="addNewCategory">создать</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  data() {
    return {
      newCategory: { tasks: [], taskNumeration: 1 },
    };
  },
  methods: {
    addNewCategory() {
      this.$store.commit("newCategoryWasCreated", this.newCategory);
      this.newCategory = null;
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped>
.shadow_back {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.click_away {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -100;
}
.modal_wrapper {
  width: 40%;
  height: 40%;
  background: #282828;
  padding: 20px;
  box-shadow: 2px 2px 20px 1px;
  color: #282828;
}
.modal_form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.close_button {
  color: black;
  position: relative;
  top: -10px;
  left: 90%;
}
.input_task {
  color: black;
  height: 70%;
  width: 90%;
  font-size: 25px;
  text-align: center;
  margin-bottom: 20px;
}
.radio_btns {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.send_btn {
  color: #282828;
}
</style>