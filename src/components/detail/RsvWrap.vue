<template>
  <div>
    <div id="rsvTitle">
      <p>예약하기</p>
    </div>
    <div data-app :disabled="isRsvDisable">
      <time-stamp-picker :rsvInfo="rsvInfo"></time-stamp-picker>
      <rsv-time-list :rsvInfo="rsvInfo"></rsv-time-list>
      <rsv-form :reqInfo="rsvInfo"></rsv-form>
    </div>
    <rsv-progress :rsvInfo="rsvInfo"></rsv-progress>
  </div>
</template>

<script>
import RsvTimeList from "./TimeList.vue";
import TimeStampPicker from "./TimeStampPicker.vue";
import RsvForm from "./RsvForm.vue";
import RsvProgress from "./RsvProgress.vue";
export default {
  name: "RsvWrap",
  components: {
    TimeStampPicker,
    RsvTimeList,
    RsvForm,
    RsvProgress,
  },
  props: ["rsvInfo"],
  data() {
    console.log(this.rsvInfo)
    return this.rsvInfo;
  },
};
</script>

<style scoped>
#rsvTitle {
  font-family: "SCBold";
  font-size: min(6.5vw, 26px);
}
#selectTime {
  display: inline-flex;
}
#rsvBtnDiv {
  margin-top: min(2vw, 8px);
  margin-bottom: min(8vw, 32px);
  text-align: right;
}
</style>