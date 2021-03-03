<template>
  <v-container>
    <transition-group name="fade">
      <div v-for="book in bookList" :key="book.id">
        <book-card :book="book" />
      </div>
      <div :key="loading" v-if="isEmptySearchResult()" class="msg">
        해당하는 도서가 없습니다 🥺
      </div>
    </transition-group>

    <div v-if="loading">
      <card-skeleton v-for="i in [1, 2, 3, 4, 5, 6, 7]" :key="i" />
    </div>
  </v-container>
</template>

<script>
import { getBooks } from "@/api/index";
import BookCard from "./BookCard.vue";
import CardSkeleton from "./CardSkeleton.vue";

const SEARCH_CNT = 8;

export default {
  components: { BookCard, CardSkeleton },
  model: {
    prop: "text",
  },
  props: ["text"],
  data: () => ({
    booksDB: [],
    searchList: [],
    bookList: [],
    startIdx: 0,
    loading: false,
    reachBottom: false,
  }),
  async created() {
    /* 탐색결과 스크롤의 끝 인식 */
    window.addEventListener("scroll", () => {
      this.reachBottom = this.bottomVisible();
    });
    /* 책 DB 가져오기 */
    this.loading = true;
    const { data } = await getBooks();
    this.loading = false;
    this.booksDB = [...data];
    this.search();
  },
  methods: {
    bottomVisible() {
      const { clientHeight, scrollHeight } = document.documentElement;
      const bottomOfPage = clientHeight + window.scrollY + 100 >= scrollHeight;
      return bottomOfPage || scrollHeight < clientHeight;
    },
    search() {
      this.startIdx = 0;
      this.bookList = [];
      this.searchList = this.booksDB.filter((item) => {
        const { title, publisher, author } = item;
        return (
          title.includes(this.text) ||
          publisher.includes(this.text) ||
          author.includes(this.text)
        );
      });
      this.getBookList();
    },
    getBookList() {
      if (this.searchList.length <= this.startIdx) return;
      
        /*  [...bookList, ...searchList]하면 버그 발생 주의  */
        /*  splice는 실제로 자르기에 별도 객체(깊은 복사) 필요  */
        this.bookList.push(...[...this.searchList].splice(this.startIdx, SEARCH_CNT));
        this.startIdx += SEARCH_CNT;
    },
    isEmptySearchResult() {
      return !this.loading && !this.bookList.length;
    },
  },
  watch: {
    reachBottom(bottom) {
      if (!bottom || this.searchList.length <= this.startIdx) return;

      /* 인위적인 loading */
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.getBookList();
      }, 300)
    },
    text() {
      this.search();
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
.msg {
  margin-top: 3rem;
  text-align: center;
}
</style>