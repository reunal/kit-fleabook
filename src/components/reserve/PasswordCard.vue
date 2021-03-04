<template>
  <v-card>
    <v-form @submit="onEdit">
      <v-text-field
        v-model="text"
        counter
        hint="비밀번호에 한글, 영문 모두 입력될 수 있습니다."
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
import { checkReservePassword } from "../../api";
export default {
  model: { prop: "itemId" },
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

      this.loading = true;
      const params = { reserveId: this.itemId, password: this.text };
      const { data } = await checkReservePassword(params);
      const { success } = data;
      this.loading = false;

      if (!success) {
        this.errMessage = "틀린 비밀번호입니다.";
        return;
      }
      this.$emit("gotoEdit", params.password);
      this.text = "";
      this.errMessage = "";
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