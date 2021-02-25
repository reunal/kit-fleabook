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
  created() {
    const search = sessionStorage.getItem('search');
    if(search) this.text = search;
  },
  components: { BookInput, BookList, Empty,  },
};
</script>

<style lang="scss" scoped>
</style>