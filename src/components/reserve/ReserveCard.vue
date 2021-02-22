<template>
  <v-card :disabled="isCancle">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          <span class="book-title">{{ title }}</span>
        </v-list-item-title>

        <v-list-item-subtitle> {{ time }} {{ name }} </v-list-item-subtitle>
        <v-list-item-subtitle class="font-weight-thin">
          예약번호 {{ id }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <div class="bts">
        <v-btn outlined text @click="onEdit"> 예약 수정 </v-btn>
        <v-btn outlined text @click="onCancel"> 예약 취소 </v-btn>
      </div>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return this.item;
  },
  methods: {
    onBookDetail() {
      console.log("bookId", this.item.bookId);
      //   this.$router.push({path: 'detail', params: {book: this.book}})
    },
    onCancel(e) {
      e.preventDefault();
      console.log("reserveId", this.item.id);
    },
    onEdit() {},
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  margin: auto;
  max-width: 700px;
}
.book-title {
  cursor: pointer;
  transition-duration: 0.5s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
.bts {
  display: flex;
  flex-direction: column;
  & > button {
    min-width: 50px;
    margin-bottom: 1px;
  }
}
</style>