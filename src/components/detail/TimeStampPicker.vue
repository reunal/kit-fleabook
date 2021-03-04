<template>
  <div>
    <v-select
      v-model="date"
      label="날짜"
      :items="dates"
      :disabled="isRsvDisable"
      @input="setDate"
    />
    <div class="inlineDiv">
      <v-select
        id="hour"
        v-model="hour"
        label="시간"
        :items="hours"
        :disabled="isRsvDisable"
        width="175px"
        @input="setHour"
      />
      <div style="width: min(2vw, 14px)"></div>
      <v-select
        id="minute"
        v-model="minute"
        label="분"
        :items="minutes"
        :disabled="isRsvDisable"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeStampPicker",
  props: ["rsvInfo"],
  data: function () {
    this.rsvInfo.dates = ["2021-03-10", "2021-03-11", "2021-03-12"];
    this.rsvInfo.hours = ["10", "11", "12", "13", "14", "15", "16", "17", "18"];
    this.rsvInfo.minutes = ["00", "10", "20", "30", "40", "50"];
    return this.rsvInfo;
  },
  methods: {
    setDate() {
      var re = new RegExp("[0-9]+-[0-9]+-[0-9]+-");
      this.rsvList.splice(0, this.rsvList.length);
      for (let i = 0; i < this.rsvRawList.length; i++) {
        if (this.rsvRawList[i].time.includes(this.date)) {
          let timeText = this.rsvRawList[i].time
            .replace(re, "")
            .replace("-", ":");
          if (timeText.length == 2) {
            timeText += ":00";
          }
          this.rsvList.push(timeText);
        }
      }
    },
    setHour() {
        if(!this.minute) this.minute = "00";
    }
  },
};
</script>

<style scoped>
.inlineDiv {
  display: inline-flex;
}
</style>