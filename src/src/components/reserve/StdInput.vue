<template>
  <v-container style="max-width: 500px">
    <v-text-field
      label="학번"
      v-model="stdId"
      :error-messages="errMessage"
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
  data() {
    const { id } = this.$route.query;
    const text = id ? id : sessionStorage.getItem("stdId");
    return {
      stdId: text ? text : "",
      errMessage: ""
    };
  },
  methods: {
    onClear() {
      sessionStorage.removeItem("stdId");
      this.stdId = "";
    },
    async onSearch() {
      if(this.stdId.length !== 8){
        this.errMessage = "올바른 8자리 학번을 입력하세요"
        return;
      }
      sessionStorage.setItem("stdId", this.stdId);
      this.$router.push({ path: "reserve", query: { id: this.stdId } });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>