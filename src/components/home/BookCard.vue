<template>
  <v-card outlined @click="onClick">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ title }}
        </v-list-item-title>
        <v-list-item-subtitle
          >{{ publisher }}. {{ auther }}.</v-list-item-subtitle
        >

        <v-list-item-content>
          <v-list-item-subtitle
            >총 {{ stockCount }}권 중 {{ stockCount - reservationCount }}권 예약
            가능</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: ["book"],
  data() {
    return this.book;
  },
  methods: {
    onClick() {
      this.$router.push({ path: "detail", params: { book: this.book } });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  margin: auto;
  max-width: 700px;
  cursor: pointer;
  transition-duration: 0.5s;
  &:hover {
    transition-property: all;
    background-color: rgba(0, 0, 0, 0.01);
  }
}
</style>