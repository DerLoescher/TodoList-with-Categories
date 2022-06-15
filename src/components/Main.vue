<template>
  <ModalWindow v-if="modalIsSeen" @closeModal="closeModal()" class="modal" />
  <div class="main_wrapper">
    <CategoriesTab @openModal="this.modalIsSeen = !this.modalIsSeen" />
    <router-view></router-view>
  </div>
</template>

<script>
import ModalWindow from "./categories/ModalWindow.vue";
import CategoriesTab from "./categories/CategoriesTab.vue";

export default {
  name: "TodoMain",
  data() {
    return {
      modalIsSeen: false,
    };
  },
  components: { CategoriesTab, ModalWindow },
  methods: {
    closeModal() {
      this.modalIsSeen = !this.modalIsSeen;
    },
  },
};
</script>

<style scoped>
.modal {
  z-index: 10;
}
.main_wrapper {
  display: flex;
}
</style>