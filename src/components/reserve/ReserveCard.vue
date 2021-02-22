<template>
  <v-card :disabled="isCancle">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          <span class="book-title" @click="onBookDetail">{{ title }}</span>
        </v-list-item-title>

        <v-list-item-subtitle> {{ time }} {{ name }} </v-list-item-subtitle>
        <v-list-item-subtitle class="font-weight-thin">
          예약번호 {{ id }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-card-actions>
        <edit-dialog v-bind:item="item" />
      </v-card-actions>
    </v-list-item>
  </v-card>
</template>

<script>
import EditDialog from './EditDialog.vue';
export default {
  components: { EditDialog },
  props: ["item"],
  data() {
    return this.item;
  },
  methods: {
    onBookDetail() {
      console.log("bookId", this.item.bookId);
      //   this.$router.push({path: 'detail', params: {book: this.book}})
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  margin: auto;
  max-width: 600px;
}
.book-title {
  cursor: pointer;
  transition-duration: 0.5s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>