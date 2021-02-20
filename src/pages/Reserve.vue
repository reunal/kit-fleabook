<template>
  <v-container>
    <std-input v-model="stdId"/>
    <reserve-list v-model="stdId"/>
  </v-container>
</template>

<script>
import StdInput from "@/components/reserve/StdInput";
import ReserveList from '@/components/reserve/ReserveList.vue';

export default {
  data: () => ({
      stdId: ""
  }),
  components: { StdInput, ReserveList },
};
</script>

<style lang="scss" scoped>
</style>