<template>
  <v-container>
    <div class="text">{{ text }}</div>
    <div v-for="(i) in [1,2,3,4]" :key="i">
      <v-skeleton-loader v-if="loading" class="mx-auto" max-width="700" type="article" />
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
    this.loading = false;
    this.bookList = data;
  },
};
</script>

<style lang="scss" scoped>
.text {
  text-align: center;
}
</style>