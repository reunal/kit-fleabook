<template>
  <v-container style="max-width: 500px">
    <v-text-field
      label="학번"
      v-model="stdId"
      :rules="[() => !!stdId || '올바른 8자리 학번을 입력하세요']"
      single-line
      outlined
      clearable
      prepend-inner-icon="mdi-account"
      append-outer-icon="mdi-magnify"
      @click:append-outer="onSearch()"
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
    stdId: "",
  }),
  methods: {
    onSearch() {
      this.$emit("eventData", this.stdId);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>