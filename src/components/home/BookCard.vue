<template>
  <v-card outlined @click="onClick">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ publisher }}. {{ author }}.
        </v-list-item-subtitle>

          <v-list-item-subtitle class="state">
            총 {{ stockCount }}권 중 
            {{ stockCount - reservationCount }}권 예약가능
          </v-list-item-subtitle>

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
      this.$router.push({ path: "book", query: { book: this.book } });
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
.state{
  margin: 6px 0 6px 0;
}
</style>