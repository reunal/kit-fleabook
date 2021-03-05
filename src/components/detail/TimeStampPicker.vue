<template>
  <div>
    <v-select
      v-model="date"
      label="날짜"
      :items="dates"
      :disabled="isRsvDisable"
      @input="setHour(true)"
    />
    <div class="inlineDiv">
      <v-select
        id="hour"
        v-model="hour"
        label="시간"
        :items="hours"
        :disabled="isRsvDisable || isHourDisable"
        @input="setMinute"
      />
      <div style="width: min(2vw, 14px)"></div>
      <v-select
        id="minute"
        v-model="minute"
        label="분"
        :items="minutes"
        :disabled="isRsvDisable || isMinuteDisable"
      />
    </div>
  </div>
</template>

<script>
const dates = ["2021-03-05", "2021-03-11", "2021-03-12"];
const hours = ["10", "11", "12", "13", "14", "15", "16", "17", "18"];
const minutes = ["00", "10", "20", "30", "40", "50"];
export default {
  name: "TimeStampPicker",
  props: ["rsvInfo"],
  data: function () {
    return this.rsvInfo;
  },
  methods: {
    setDate() {
      this.dates.splice(0, this.dates.length);
      for (let i = 0; i < dates.length; i++) {
        if (new Date(dates[i] + " 23:59") >= this.todayInfo) {
          this.dates.push(dates[i]);
        }
      }
      this.setHour(false);
    },
    setHour(isSetNull) {
      if (isSetNull) {
        this.hour = null;
        this.minute = null;
      }
      this.setRsvList();
      this.hours.splice(0, this.hours.length);
      if (!this.date) {
        this.isHourDisable = true;
      } else {
        this.isHourDisable = false;
        for (let i = 0; i < hours.length; i++) {
          if (
            new Date(this.date + " " + hours[i] + ":00") >=
            new Date(
              this.todayInfo.toLocaleDateString() +
                " " +
                this.todayInfo.getHours() +
                ":00"
            )
          ) {
            console.log(hours[i]);
            this.hours.push(hours[i]);
          }
        }
        if (!this.hour) this.hour = this.hours[0];
      }
      this.setMinute();
    },
    setMinute() {
      this.minutes.splice(0, this.minutes.length);
      if (!this.date || !this.hour) {
        this.isMinuteDisable = true;
      } else {
        this.isMinuteDisable = false;
        for (let i = 0; i < minutes.length; i++) {
          if (
            new Date(this.date + " " + this.hour + ":" + minutes[i]) >
            this.todayInfo
          ) {
            this.minutes.push(minutes[i]);
          }
        }
        if (!this.minute) this.minute = this.minutes[0];
        if (this.minutes.length === 0) {
          this.hours.splice(0, 1);
          this.minute = null;
        }
      }
    },
    setRsvList() {
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
    intervalMethod() {
      this.rsvInfo.todayInfo = new Date();
      this.setDate();
    },
  },
  mounted() {
    this.intervalMethod();
    setInterval(this.intervalMethod, 30000);
  },
};
</script>

<style scoped>
.inlineDiv {
  display: flex;
}
</style>