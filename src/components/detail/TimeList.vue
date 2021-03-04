<template>
  <v-simple-table dense v-if="!(date == null || rsvList.length == 0)">
    <template v-slot:default>
      <thead>
        <tr>
          <th>선택한 날짜에 예약된 시간</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td id="timeList">
            <span
              v-for="(rsv, index) in rsvList"
              :key="(rsv, index)"
              v-bind:id="index"
            >
              {{ rsv }}
            </span>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "RsvTimeList",
  props: ["rsvInfo"],
  data: function () {
    return this.rsvInfo;
  },
};
</script>

<style scoped>
#timeList {
  text-align: center;
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
</style>