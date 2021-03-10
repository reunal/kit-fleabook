<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th>선택한 날짜에 예약된 시간</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td id="timeList">
            <span v-for="(rsv, idx) in list" :key="(rsv, idx)" :id="idx">
              {{ rsv }}
            </span>
            <span v-if="!list.length" class="text--secondary">없음</span>
          </td>
        </tr>
      </tbody>
      <div id="coronaWarning">
        <v-icon color="red">{{ "mdi-alert-circle" }}</v-icon>
        <span
          >코로나 감염 예방을 위해 많은 사람이 몰리는 것을 방지하기 위해서<br />
          이미 다른 학우분이 예약한 시간을 피해 예약을 부탁드립니다.</span
        >
      </div>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "RsvTimeList",
  props: ["rsvList"],
  data() {
    return { list: [] };
  },
  watch: {
    rsvList() {
      this.list = [...this.rsvList];
      this.list.sort();
    },
  },
};
</script>

<style scoped>
#timeList {
  text-align: center;
}
#coronaWarning {
  color: red;
  font-size: min(2.5vw, 17.5px);
  text-align: center;
  border: 1.5px solid rgb(212, 181, 0);
  border-radius: min(1vw, 7px);
}
/* vuetify 설정 부분 건드리는 css */
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  padding-top: min(1.5vw, 6px);
  padding-bottom: min(1.5vw, 6px);
  font-size: min(4vw, 16px);
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  padding-top: min(1.5vw, 6px);
  padding-bottom: min(1.5vw, 6px);
  font-size: min(4vw, 16px);
}
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > th,
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th,
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tfoot
  > tr
  > th {
  text-align: center;
}
.v-icon.v-icon {
  font-size: min(2.5vw, 17.5px);
}
</style>