<template>
  <v-container>
    <div class="text">{{ text }}</div>
    <book-card v-for="(book,idx) in [1,2,3,4,5,6,7,8,9]" v-bind:key="idx"> </book-card>
  </v-container>
</template>

<script>
import BookCard from './BookCard.vue';
export default {
  components: { BookCard },
  model: {
    prop: "text",
  },
  props: ["text"],
  data: () => ({
      bookList: [1,2,3,4]
  }),
  methods: {},
};
</script>

<style lang="scss" scoped>
.text{
  text-align: center;
}
</style>