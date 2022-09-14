<template>
  <v-card :disabled="isCancel">
    <v-list-item three-line class="pl-0">
      <v-list-item-content class="card-hover pl-5 mr-5" @click="onBookDetail">
        <v-list-item-title class="title font-weight-bold mb-2">
          <span>{{ title }}</span>
        </v-list-item-title>

        <v-list-item-subtitle class="subtitle mb-1">
          <span>{{ renderDate() }}</span>
          <span>{{ time }}</span>
          <span>{{ name }}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="font-weight-light">
          예약번호 {{ id }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="font-weight-light">
          예약상태 {{ state }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-card-actions>
        <edit-dialogs :item="item" />
      </v-card-actions>
    </v-list-item>
  </v-card>
</template>

<script>
import EditDialogs from "./EditDialogs.vue";
export default {
  components: { EditDialogs },
  props: ["item"],
  data() {
    return this.item;
  },
  methods: {
    onBookDetail() {
      this.$router.push({ path: "book", query: { bookId: this.bookId } });
    },
    renderDate() {
      const dayOfWeek = new Date(this.date).getDay();
      const ko = ["일", "월", "화", "수", "목", "금", "토"];
      return (
        this.date.substring(this.date.indexOf("-") + 1) + `(${ko[dayOfWeek]})`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  margin: auto;
  max-width: 600px;
}
.card-hover {
  cursor: pointer;
  transition-duration: 0.5s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
.subtitle {
  & > span {
    margin-right: 5px;
  }
  & > :last-child {
    margin-left: 5px;
  }
}
</style>
