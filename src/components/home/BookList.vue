<template>
  <v-container>
    <transition-group name="fade">
      <div v-for="(book, i) in bookList" :key="i">
        <book-card :book="book" />
      </div>
    </transition-group>

    <div v-if="loading">
      <div v-for="i in [1, 2, 3, 4, 5, 6, 7]" :key="i">
        <v-skeleton-loader
          class="skeleton"
          tile
          type="card-heading, list-item-two-line"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
import { getBooks } from "@/api/index";
import BookCard from "./BookCard.vue";
import tmpBooks from "../../assets/tmpBooks";

const SEARCH_CNT = 5;

export default {
  components: { BookCard },
  model: {
    prop: "text",
  },
  props: ["text"],
  data: () => ({
    bookList: tmpBooks,
    startIdx: 0,
    loading: false,
    reachBottom: false,
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
    async addBooks() {
      // 서버로부터 받은 데이터가 10개 미만이면
      if (this.startIdx > 15) return;

      this.loading = true;

      const { data } = await getBooks();
      this.bookList = [...this.bookList, ...data];
      this.startIdx += SEARCH_CNT;
      // if(this.bottomVisible())
      //   this.addArr();

      this.loading = false;
    },
  },
  watch: {
    reachBottom(bottom) {
      if (bottom) this.addBooks();
    },
    text(text) {
      console.log(text);
    },
  },
};
</script>

<style lang="scss" scoped>
.skeleton {
  max-width: 700px;
  margin: auto;
  margin-top: 1px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  & > :first-child {
    height: 40px;
  }
  & > :last-child {
    height: 64px;
  }
}

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
</style>