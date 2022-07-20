<template>
  <div class="shadow_back">
    <div class="click_away" @click="this.$emit('closeModal')"></div>
    <div class="modal_wrapper">
      <button @click="this.$emit('closeModal')" class="close_button">
        <img class="close_svg" src="../../assets/delete.svg" alt="X" />
      </button>
      <div class="modal_form" v-if="this.categoriesList.length < 11">
        <input
          class="input_task"
          type="text"
          v-model="newCategory.name"
          autofocus
          maxlength="15"
        />
        <span v-if="emptyFields" class="empty_message"
          >add the name and color of the new category</span
        >
        <form>
          <div class="radio_btns">
            <div
              v-for="color in this.$store.state.colors"
              :key="color"
              class="color_radio"
            >
              <input
                type="radio"
                v-bind:value="color"
                v-model="newCategory.color"
                class="color_radio_button"
              />
              <label
                class="color_radio_label"
                :style="{ 'border-bottom': `5px solid ${color}` }"
                >{{ color }}</label
              >
            </div>
          </div>
        </form>
        <button class="send_btn" @click="addNewCategory">create</button>
      </div>
      <div class="atten_wrapper">
        <span class="attention_text" v-if="this.categoriesList.length > 10"
          >The maximum number of added categories is 10. Delete one of your
          categories to create a new one.</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  data() {
    return {
      newCategory: {
        name: "",
        color: "",
        slug: "",
      },
      emptyFields: false,
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories;
    },
  },
  methods: {
    addNewCategory() {
      if (this.newCategory.name !== "" && this.newCategory.color !== "") {
        this.newCategory.slug = this.newCategory.name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");
        this.$store.dispatch("addNewCategory", this.newCategory);
        this.$emit("closeModal");
        this.newCategory = null;
      } else {
        this.emptyFields = true;
      }
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
  height: 50%;
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
  top: -15px;
  left: 95%;
  height: 30px;
  width: 30px;
  background: transparent;
  border-color: transparent;
}
.close_button:hover,
.close_button:active {
  background: white;
  border-radius: 20px;
}
.close_svg {
  height: 100%;
  width: 100%;
}
.input_task {
  color: black;
  height: 70%;
  width: 90%;
  font-size: 25px;
  text-align: center;
  margin-bottom: 20px;
}
.empty_message {
  color: grey;
  margin-top: -18px;
}
.radio_btns {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}
.color_radio {
  margin: 3px;
  width: 100px;
  height: 20px;
  display: flex;
  justify-content: space-between;
}
.color_radio_button {
  height: 20px;
  width: 20px;
}
.color_radio_label {
  font-size: 20px;
  padding-bottom: 22px;
}
.send_btn {
  font-size: 20px;
  color: white;
  width: 100px;
  height: 30px;
  background: transparent;
  border-color: rgb(252, 248, 248);
  border-radius: 20px;
}
.send_btn:hover {
  background: rgb(142, 142, 142);
  cursor: pointer;
}
.send_btn:active {
  border-color: white;
}
.atten_wrapper {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
}
.attention_text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  font-size: 20px;
}
@media screen and (max-width: 770px) {
  .modal_wrapper {
    width: 70%;
  }
}
</style>