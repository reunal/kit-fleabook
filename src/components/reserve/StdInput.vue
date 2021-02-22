<template>
  <v-container style="max-width: 500px">
    <v-text-field
      label="학번"
      v-model="stdId"
      :rules="[() => !!stdId || '올바른 8자리 학번을 입력하세요']"
      single-line
      outlined
      clearable
      @click:clear="onClear"
      prepend-inner-icon="mdi-account"
      append-outer-icon="mdi-magnify"
      @click:append-outer="onSearch()"
      @keyup.enter="onSearch()"
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    stdId: "",
  }),
  created() {
    this.stdId = sessionStorage.getItem("stdId");
  },
  methods: {
    onClear() {
      this.stdId = "";
      sessionStorage.removeItem("stdId");
    },
    async onSearch() {
      sessionStorage.setItem("stdId", this.stdId);
      this.$router.push({ path: "reserve", query: { id: this.stdId } });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>