<template>
  <v-menu
    ref="menuRef"
    v-model="dateMenu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-combobox
        v-model="date"
        label="날짜를 선택해주세요"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        :disabled="isRsvDisable"
      ></v-combobox>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      scrollable
      min="2021-03-10"
      max="2021-03-12"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="dateMenu = false"> 취소 </v-btn>
      <v-btn text color="primary" @click="setDate"> 확인 </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DatePicker",
  props: ["isRsvDisable"],
  data: function () {
    return {
      dateMenu: false,
      date: null,
    };
  },
  methods: {
    setDate: function () {
      this.$refs.menuRef.save(this.date);
      this.$emit("getDate", this.date);
    },
  },
};
</script>

<style scoped>
</style>