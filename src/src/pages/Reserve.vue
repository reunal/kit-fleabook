<template>
  <v-container>
    <std-input />
    <reserve-list />
  </v-container>
</template>

<script>
import StdInput from "@/components/reserve/StdInput";
import ReserveList from "@/components/reserve/ReserveList.vue";

export default {
  data: () => ({
    list: [],
  }),
  components: { StdInput, ReserveList },
};
</script>

<style lang="scss" scoped>
</style>