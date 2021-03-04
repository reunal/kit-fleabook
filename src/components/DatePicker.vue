<template>
  <v-menu
    offset-y
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        readonly
        v-model="date"
        label="예약 날짜"
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      min="2021-03-10"
      max="2021-03-12"
      @input="setDate()"
    />
  </v-menu>
</template>

<script>
export default {
  name: "DatePicker",
  props: ["reservDate"],
  data: function () {
    return {
      menu: false,
      date: this.reservDate,
    };
  },
  methods: {
    setDate() {
      this.menu = false;
      this.$emit("getDate", this.date);
    },
  },
};
</script>

<style scoped>
</style>