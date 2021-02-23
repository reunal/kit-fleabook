<template>
  <v-container>
    <div class="text">{{ text }}</div>
    <div v-for="(i) in [1,2,3,4,5]" :key="i">
      <v-skeleton-loader v-if="loading" class="skeleton" tile type="card-heading, list-item-two-line" />
    </div>
    <div v-for="(book) in bookList" :key="book.id">
      <book-card :book="book" />
    </div>
  </v-container>
</template>

<script>
import { getBooks } from "@/api/index";
import BookCard from "./BookCard.vue";

export default {
  components: { BookCard },
  model: {
    prop: "text",
  },
  props: ["text"],
  data: () => ({
    bookList: [],
    loading: false,
  }),
  async created() {
    this.loading = true;
    const { data } = await getBooks();
    this.bookList = data;
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.text {
  text-align: center;
}
.skeleton{
  max-width: 700px;
  margin: auto;
  border: 1px solid rgba(0,0,0,0.1);
  & > :first-child {
    height: 40px;
  }
  & > :last-child {
    height: 64px;
  }
}
</style>