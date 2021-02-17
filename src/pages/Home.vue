<template>
    <div class="root">
        <Header msg="VUE STUDY"/>
        <BookList />
    </div>
</template>

<script>
import Header from '@@/Header'
import BookList from "@@/home/BookList";


export default {
  name: 'Home',
  components: {
    Header,
    BookList  
  }
}
</script>

<style>
.root{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
