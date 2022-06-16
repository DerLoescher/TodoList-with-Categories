<template>
  <ModalWindow v-if="modalIsSeen" @closeModal="closeModal()" class="modal" />
  <div class="main_wrapper">
    <CategoriesTab
      @openModal="openModal"
      class="categories_tab"
      :class="{ categories_tab_active: tabIsSeen }"
    />
    <router-view
      @showCategoryTab="showCategoryTab"
      :tabIsSeen="tabIsSeen"
    ></router-view>
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
      tabIsSeen: false,
    };
  },
  components: { CategoriesTab, ModalWindow },
  methods: {
    closeModal() {
      this.modalIsSeen = !this.modalIsSeen;
    },
    showCategoryTab() {
      this.tabIsSeen = !this.tabIsSeen;
    },
    openModal() {
      this.showCategoryTab();
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
@media screen and (max-width: 770px) {
  .categories_tab {
    position: absolute;
    display: none;
    width: 50%;
    z-index: 10;
  }
  .categories_tab_active {
    display: block;
  }
}
@media screen and (max-width: 350px) {
  .categories_tab {
    width: 100%;
  }
}
</style>