<template>
  <v-container>
    <v-text-field
      label="도서 제목"
      v-model="search"
      solo
      clearable
      prepend-inner-icon="mdi-cog"
      append-icon="mdi-magnify"
      @click:prepend-inner="onSearch()"
      @click:append="onSearch()"
      @keyup.enter="onSearch()"
      @click:clear="onClear()"
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  model: {
    prop: "text",
    event: "eventData",
  },
  props: ["text"],
  data: () => ({
    search: "",
  }),
  created() {
    this.search = this.text;
  },
  methods: {
    onSearch() {
      sessionStorage.setItem("search", this.search);
      this.$emit("eventData", this.search);
    },
    onClear() {
      this.search = "";
      sessionStorage.removeItem("search");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  padding: 0 20px 0 0;
  z-index: 1000;
  & > .v-input {
    max-width: 500px;
    margin: auto;
  }
}
</style>