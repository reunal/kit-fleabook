<template>
  <v-container>
    <v-text-field
      label="도서 제목"
      v-model="text"
      solo
      clearable
      prepend-inner-icon="mdi-cog"
      append-icon="mdi-magnify"
      @click:prepend-inner="onSearch()"
      @click:append="onSearch()"
      @keyup.enter="onSearch()"
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  model: {
    event: "eventData",
  },
  data: () => ({
    text: "",
  }),
  methods: {
    onSearch() {
      this.$emit("eventData", this.text);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  padding: 0 20px 0 0;
  z-index: 1000;
  & > .v-input{
    max-width: 500px;
    margin: auto;
  }
}
</style>