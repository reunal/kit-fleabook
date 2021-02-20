<template>
  <v-container>
    <book-input v-model="text"/>
    <empty/>
    <book-list v-model="text"/>
  </v-container>
</template>

<script>
import Empty from '../components/Empty.vue';
import BookInput from "../components/home/BookInput.vue";
import BookList from '../components/home/BookList.vue';
export default {
  data: () => ({
      text: ""
  }),
  components: { BookInput, BookList, Empty,  },
};
</script>

<style lang="scss" scoped>
</style>