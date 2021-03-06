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
    <div :key="loading">
      <div v-if="!loading">
        <reserve-card v-for="item in list" :key="item.id" :item="item" class="mb-1" />
      </div>
      <div v-if="isSearch && !loading && !list.length" class="text-center">
        예약한 도서가 없습니다 🥺
      </div>
      <!-- <div v-else-if="!loading" class="mb-auto text--disabled text-center mt-5">
        예약에 관련하여 오류가 있으면 000 으로 문의해주세요!
      </div> -->
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
    isSearch: false
  }),
  async created() {
    const { id } = this.$route.query;
    const stdId = id ? id : sessionStorage.getItem("stdId");
    if (stdId) {
      this.isSearch = true;
      this.loading = true;
      const { data } = await searchReserve(id ? id : stdId);
      this.list = data.sort((a,b) => this.getTime(a)-this.getTime(b));
      this.loading = false;
    }
  },
  methods: {
    getTime(item){
      const date = new Date(item.date);
      const [h, m] = item.time.split(":");
      date.setHours(h);
      date.setMinutes(m);
      return date.getTime();
    },
  }
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

</style>