<template>
  <div class="wrapper">
    <v-select
      v-model="hour"
      label="시간"
      menu-props="auto"
      hide-details
      :items="['10', '11', '12', '13', '14', '15', '16', '17']"
      @input="setTime()"
    />
    <v-select
      v-model="minute"
      label="분"
      menu-props="auto"
      hide-details
      :items="['00', '10', '20', '30', '40', '50']"
      @input="setTime()"
    />
  </div>
</template>

<script>
export default {
  name: "TimePicker",
  props: ["reservTime"],
  data() {
    const [h, m] = this.reservTime.split(":");
    return {
      hour: h,
      minute: m,
    };
  },
  methods: {
    setTime() {
      this.$emit("getTime", `${this.hour}:${this.minute}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: inline-flex;
  & > * {
    margin-right: 1rem;
  }
}
</style>