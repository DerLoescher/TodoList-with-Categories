<template>
  <div class="shadow_back">
    <div class="click_away" @click="this.$emit('closeModal')"></div>
    <div class="modal_wrapper">
      <input type="text" v-model="newCategory.name" autofocus />
      <button @click="this.$emit('closeModal')" class="close_button">
        close
      </button>
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
</template>

<script>
export default {
  name: "ModalWindow",
  data() {
    return {
      newCategory: {},
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
  background: white;
  padding: 20px;
  box-shadow: 2px 2px 20px 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.radio_btns {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>