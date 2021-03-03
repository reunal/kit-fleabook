<template>
  <v-card>
    <v-form @submit="onEdit">
      <v-text-field
        v-model="text"
        counter
        :loading="loading"
        :type="show ? 'text' : 'password'"
        :error-messages="errMessage"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        append-outer-icon="mdi-check-bold"
        @click:append="show = !show"
        @click:append-outer="onEdit"
        @keyup.enter="onEdit"
        autocomplete="on"
      >
        <template v-slot:label>
          <v-icon>mdi-lock</v-icon>예약<strong> 비밀번호</strong>를 입력하세요!
        </template>
      </v-text-field>
    </v-form>
  </v-card>
</template>

<script>
import { checkReservePassword } from '../../api';
export default {
  props: ["itemId"],
  data: () => ({
    text: "",
    show: false,
    loading: false,
    errMessage: "",
  }),
  methods: {
    async onEdit(e) {
      e.preventDefault();
      if (!this.text) {
        this.errMessage = "입력해주세요.";
        return;
      }
      console.log(this.itemId)

      this.loading = true;
      const { data } = await checkReservePassword({reservationId: this.itemId, password: this.text});
      console.log(data)
      this.loading = false;
      if (this.text !== "asdf") {
        this.errMessage = "틀린 비밀번호입니다.";
        return;
      }
      this.$emit("gotoEdit", this.text);
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