<template>
  <v-container>
    <div v-if="loading" class="progress">
      <v-progress-circular
        color="primary"
        :size="70"
        :width="7"
        indeterminate
      ></v-progress-circular>
    </div>

    <transition-group name="fade">
      <div v-for="(item, idx) in list" :key="idx">
        <reserve-card v-if="!loading" :item="item" class="card" />
      </div>
      <div :key="loading" v-if="!loading && !list.length" class="msg">
        예약한 도서가 없습니다 🥺
      </div>
    </transition-group>
  </v-container>
</template>

<script>
import ReserveCard from "./ReserveCard.vue";
import { searchReserve } from "@/api/index";

export default {
  components: { ReserveCard },
  data: () => ({
    list: [],
    loading: false,
  }),
  async created() {
    const { id } = this.$route.query;
    const stdId = sessionStorage.getItem("stdId");
    if (id || stdId) {
      this.loading = true;
      const { data } = await searchReserve(id ? id : stdId);
      this.list = data;
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.progress {
  padding-top: 5rem;
  text-align: center;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
.msg {
  text-align: center;
}
.card {
  margin-bottom: 3px;
}
</style>