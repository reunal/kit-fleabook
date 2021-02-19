<template>
  <v-container>
    <StdInput v-model="stdId"/>
    <ReserveList v-model="stdId"/>
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