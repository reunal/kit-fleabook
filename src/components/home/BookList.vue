<template>
  <v-container>
    <transition-group name="fade">
      <div v-for="(book, i) in bookList" :key="i">
        <book-card :book="book" />
      </div>
      <div :key="loading" v-if="!loading && !bookList.length" class="msg">해당하는 도서가 없습니다 🥺</div>
    </transition-group>

    <div v-if="loading">
      <card-skeleton v-for="i in [1, 2, 3, 4, 5, 6, 7]" :key="i" />
    </div>
  </v-container>
</template>

<script>
import { getBooks } from "@/api/index";
import BookCard from "./BookCard.vue";
import CardSkeleton from './CardSkeleton.vue';

const SEARCH_CNT = 10;

export default {
  components: { BookCard, CardSkeleton },
  model: {
    prop: "text",
  },
  props: ["text"],
  data: () => ({
    bookList: [],
    lastName: "",
    searchEnd: false,
    loading: false,
    reachBottom: false
  }),
  async created() {
    window.addEventListener("scroll", () => {
      this.reachBottom = this.bottomVisible();
    });
    this.addBooks();
  },
  methods: {
    bottomVisible() {
      const { clientHeight, scrollHeight } = document.documentElement;
      const bottomOfPage = clientHeight + window.scrollY + 100 >= scrollHeight;
      return bottomOfPage || scrollHeight < clientHeight;
    },

    async addBooks(start=this.text) {
      if (this.searchEnd) return;
      /* 책 가져오기 */
      this.loading = true;
      const { data } = await getBooks({start, len: SEARCH_CNT});
      this.searchEnd = data.length < SEARCH_CNT;
      this.bookList = [...this.bookList, ...data];
      console.log(data)
      this.loading = false;
    },
  },
  watch: {
    reachBottom(bottom) {
      const len = this.bookList.length;
      if (bottom && len){
        const {title} = this.bookList[len-1];
        this.addBooks(title);
      }
    },
    text() {
      this.bookList = [];
      this.searchEnd = false;
      this.addBooks();
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
.msg{
  margin-top: 3rem;
  text-align: center;
}
</style>