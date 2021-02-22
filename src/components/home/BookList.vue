<template>
  <v-container>
    <div class="text">{{ text }}</div>
    <div v-for="(book, idx) in bookList" v-bind:key="idx">
      <book-card v-bind:book="book"/>
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
  }),
  async created() {
    const { data } = await getBooks();
    this.bookList = data;
  },
};
</script>

<style lang="scss" scoped>
.text {
  text-align: center;
}
</style>