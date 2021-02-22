<template>
  <v-card>
    <v-list-item-content>
      <v-card-title>
        {{ item.title }}
      </v-card-title>
    </v-list-item-content>
    <v-card-actions>
      <v-btn @click="close()">수정</v-btn>
      <v-btn @click="close()">예약 취소</v-btn>
      <v-btn @click="close()">닫기</v-btn>
    </v-card-actions>
    <v-card-subtitle> 예약 취소는 되돌릴 수 없습니다. </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    close() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>