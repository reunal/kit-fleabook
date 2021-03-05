<template>
  <v-card :disabled="isCancle">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          <span class="book-title" @click="onBookDetail">{{ title }}</span>
        </v-list-item-title>

        <v-list-item-subtitle class="subtitle"> 
          <span>{{renderDate()}}</span> 
          <span>{{ time }}</span>
          <span>{{ name }}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="font-weight-thin">
          예약번호 {{ id }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-card-actions>
        <edit-dialogs :item="item" />
      </v-card-actions>
    </v-list-item>
  </v-card>
</template>

<script>
import EditDialogs from './EditDialogs.vue';
export default {
  components: { EditDialogs },
  props: ["item"],
  data() {
    return this.item;
  },
  methods: {
    onBookDetail() {
      this.$router.push({path: 'book', query: {bookId: this.bookId}});
    },
    renderDate() {
      const dayOfWeek = new Date(this.date).getDay();
      const ko = ["일", "월", "화", "수", "목", "금", "토"]
      return this.date.substring(this.date.indexOf('-')+1) + `(${ko[dayOfWeek]})`;
    }
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
.subtitle{
  & > span {
    margin-right: 5px;
  }
  & > :last-child {
    margin-left: 5px;
  }
}
</style>