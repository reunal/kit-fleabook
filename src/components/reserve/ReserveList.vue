<template>
  <v-container>
    <div v-for="(item, idx) in list" v-bind:key="idx">
      <reserve-card v-bind:item="item"/>
    </div>
  </v-container>
</template>

<script>
import ReserveCard from './ReserveCard.vue';
import {searchReserve} from "@/api/index"

export default {
  components: { ReserveCard },
  data: () => ({
    list: []
  }),
  async created() {
    const { id } = this.$route.query;
    const stdId = sessionStorage.getItem("stdId");
    if (id || stdId) {
      const { data } = await searchReserve(id ? id : stdId);
      this.list = data;
    }
  },
};
</script>

<style lang="scss" scoped>

</style>