<template>
  <v-card>
    <v-container>
      <v-card-title> {{ item.title }} </v-card-title>

      <v-container class="inputs">
        <date-picker @getDate="getDate"></date-picker>
        <time-picker @getTime="getTime"></time-picker>
      </v-container>
    </v-container>

    <v-card-actions>
      <div class="bts">
        <v-btn @click="close()">수정</v-btn>
        <v-btn @click="onCancel()">예약 취소</v-btn>
        <v-btn @click="close()" class="mxauto">닫기</v-btn>
      </div>
    </v-card-actions>
    <v-card-subtitle class="text-center">
      예약 취소는 되돌릴 수 없습니다.
    </v-card-subtitle>
  </v-card>
</template>

<script>
// import { cancelReserve, editReserve } from '../../api';
import DatePicker from "../DatePicker.vue";
import TimePicker from "../TimePicker.vue";

export default {
  components: { DatePicker, TimePicker },
  props: ["item"],
  data: () => ({
    date: '',
    time: '',
  }),
  methods: {
    close() {
      this.$emit("input", false);
    },
    async onEdit() {
      console.log(this.item)
      // const {data} = await editReserve({reserveId: this.item.id, password:this.item.password, data: this.item});
      // console.log(data)
    },
    async onCancel() {
      console.log(this.item)
      // const {data} = await cancelReserve({bookId, reserveId: this.item.id, password:this.item.password});
      // console.log(data)
    },
    //자식에게 데이터를 받아오는 함수
    getDate: function (date) {
      this.date = date;
    },
    getTime: function (time) {
      this.time = time;
    },
  },
};
</script>

<style lang="scss" scoped>
.inputs {
  max-width: 500px;
}
.bts {
  margin: auto;
  & > .v-btn {
    margin-left: 4px;
  }
}
</style>