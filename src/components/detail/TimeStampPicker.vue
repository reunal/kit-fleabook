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
const dates = ["2021-03-11", "2021-03-12"];
const hours = ["10", "11", "12", "13", "14", "15", "16", "17"];
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
        const dl = this.splitDate(dates[i], "-");
        if (new Date(dl[0], dl[1], dl[2], 23, 59, 59) >= this.todayInfo) {
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
        const dl = this.splitDate(this.date, "-");
        const tdl = this.splitDate(this.todayInfo.toLocaleDateString(), ".");
        const todayHour = this.todayInfo.getHours();
        for (let i = 0; i < hours.length; i++) {
          if (
            new Date(dl[0], dl[1], dl[2], Number(hours[i]), 0, 0) >=
            new Date(tdl[0], tdl[1], tdl[2], todayHour, 0, 0)
          ) {
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
        const dl = this.splitDate(this.date, "-");
        const hour = Number(this.hour);
        for (let i = 0; i < minutes.length; i++) {
          if (
            new Date(dl[0], dl[1], dl[2], hour, Number(minutes[i]), 0) >
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
      this.rsvList.splice(0, this.rsvList.length);
      for (let i = 0; i < this.rsvRawList.length; i++) {
        if (this.rsvRawList[i].date === undefined) {
          continue;
        }
        if (this.rsvRawList[i].isSold === undefined) {
          continue;
        }
        if (this.rsvRawList[i].isCancel === undefined) {
          continue;
        }
        if (
          this.rsvRawList[i].date.includes(this.date) &&
          !this.rsvRawList[i].isSold &&
          !this.rsvRawList[i].isCancel
        ) {
          let skipFlag = false;
          for (let j = 0; j < this.rsvList.length; j++) {
            if (this.rsvList[j] == this.rsvRawList[i].time) {
              skipFlag = true;
              break;
            }
          }
          if (skipFlag) {
            continue;
          }
          this.rsvList.push(this.rsvRawList[i].time);
        }
      }
    },
    intervalMethod() {
      this.rsvInfo.todayInfo = new Date();
      this.setDate();
    },
    splitDate(date, separator) {
      let list = date.split(separator);
      list[0] = Number(list[0]);
      list[1] = Number(list[1]) - 1;
      list[2] = Number(list[2]);
      return list;
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