<template>
  <v-card>
    <v-text-field
      v-model="text"
      counter
      :loading="loading"
      :type="show ? 'text' : 'password'"
      :error-messages="errMessage"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      append-outer-icon="mdi-check-bold"
      @click:append="show = !show"
      @click:append-outer="onEdit()"
      @keyup.enter="onEdit()"
    >
      <template v-slot:label>
        <v-icon>mdi-lock</v-icon>예약<strong> 비밀번호</strong>를 입력하세요!
      </template>
    </v-text-field>
  </v-card>
</template>

<script>
export default {
  props: ["itemId"],
  data: () => ({
    text: "",
    show: false,
    loading: false,
    errMessage: "",
  }),
  methods: {
    onEdit() {
      if (!this.text) {
        this.errMessage = "입력해주세요.";
        return;
      }
      console.log(this.itemId)
      this.loading = true;
      setTimeout(() => (this.loading = false), 1000);

      if (this.text !== "asdf") {
        this.errMessage = "틀린 비밀번호입니다.";
        return;
      }

      this.text = "";
      this.errMessage = "";
      this.$emit("gotoEdit");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-text-field {
  padding: 2rem 1rem 2rem 1rem;
  width: 400px;
  margin: auto;
}
</style>