<template>
  <v-card>
    <v-container>
      <v-card-title class="title">
        <span class="font-weight-black">{{ item.title }}</span>
        <span class="font-weight-thin">{{ item.id }}</span>
      </v-card-title>

      <v-container class="inputs">
        <date-picker :reservDate="item.date" @getDate="getDate"></date-picker>
        <time-picker :reservTime="item.time" @getTime="getTime"></time-picker>
      </v-container>
    </v-container>

    <v-card-actions>
      <div class="bts">
        <v-btn @click="onEdit()">수정</v-btn>
        <v-btn @click="onCancel()">예약 취소</v-btn>
        <v-btn @click="close()" class="mxauto">닫기</v-btn>
      </div>
    </v-card-actions>

    <v-card-subtitle class="status">
      <div v-if="!loading">
        {{ msg }}
      </div>
      <div v-if="loading">
        <v-progress-circular :width="2" color="amber" indeterminate />
      </div>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { cancelReserve, editReserve } from "../../api";
import DatePicker from "../DatePicker.vue";
import TimePicker from "../TimePicker.vue";

export default {
  components: { DatePicker, TimePicker },
  props: ["item"],
  data: () => ({
    date: "",
    time: "",
    msg: "예약 취소는 되돌릴 수 없습니다.",
    loading: false,
    reload: false
  }),
  methods: {
    close() {
      this.$emit("input", false);
      if(this.reload) window.location.reload();
    },
    onEdit() {
      const { id: reserveId, password } = this.item;
      const body = { date: this.date, time: this.time };
      this.loading = true;
      editReserve({ reserveId, password, body })
        .then(() => {
          this.loading = false;
          this.msg = "예약 시간 수정 완료! 🥰";
          this.reload = true;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.msg = "시스템 내부 오류가 발생했습니다 😢";
        });
    },
    onCancel() {
      const { bookId, id: reserveId, password } = this.item;
      this.loading = true;
      cancelReserve({ bookId, reserveId, password })
        .then(() => {
          this.$emit("popUp", "예약 취소되었습니다");
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.msg = "시스템 내부 오류가 발생했습니다 😢";
        });
    },
    //자식에게 데이터를 받아오는 함수
    getDate(date) {
      this.date = date;
    },
    getTime(time) {
      this.time = time;
    },
  },
};
</script>

<style lang="scss" scoped>
.title{
  padding-bottom: 0;
  & > :first-child{
    font-size: larger;
  }
  & > :last-child{
    font-size: 10px;
    margin-left: 1rem;
  }
}
.inputs {
  max-width: 500px;
  text-align: center;
  & > :first-child {
    margin: auto;
    padding-right: 25px;
  }
}
.bts {
  margin: auto;
  & > .v-btn {
    margin-left: 4px;
  }
}
.status {
  text-align: center;
  padding-bottom: 0;
  & > * {
    height: 50px;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>