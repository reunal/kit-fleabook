<template>
  <v-container>
    <book-input v-model="text" @filterEvent="onFilter"/>
    <empty/>
    <book-list v-model="text" :filter="filter"/>
  </v-container>
</template>

<script>
import Empty from '../components/Empty.vue';
import BookInput from "../components/home/BookInput.vue";
import BookList from '../components/home/BookList.vue';
export default {
  components: { BookInput, BookList, Empty,  },
  data: () => {
    const search = sessionStorage.getItem('search')
    return {
      text: search ? search : "",
      filter: false
    }
  },
  methods: {
    onFilter(filter) {
      this.filter = filter 
    }
  }
};
</script>

<style lang="scss" scoped>
</style>