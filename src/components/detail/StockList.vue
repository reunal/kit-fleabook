<template>
  <div>
    <div id="stockTitle">
      <p>재고 리스트</p>
      <p id="stockCnt">(예약 가능 권수 : {{ stockCnt - rsvCnt }})</p>
    </div>
    <div id="stockTableDiv" v-if="isExistStock">
      <v-simple-table id="stockTable" dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th>상태</th>
              <th>가격</th>
              <th>판매여부</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(stock, index) in stockList"
              :key="(stock, index)"
              v-bind:id="index"
              :style="setListBackground(stock.isSold)"
            >
              <td>
                {{ stock.state }}
              </td>
              <td>
                {{ stock.price }}
              </td>
              <td>
                <div v-if="stock.isSold">판매 완료</div>
                <div v-if="!stock.isSold">판매 중</div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "StockList",
  props: ["stockInfo"],
  data: function () {
    return this.stockInfo;
  },
  methods: {
    setListBackground(isSold) {
      if (isSold) {
        return { color: "#d97a7c" };
      }
      return {};
    },
  },
};
</script>

<style scoped>
#stockTitle {
  font-family: "SCBold";
  font-size: min(6.5vw, 26px);
}
#stockCnt {
  font-size: min(4vw, 16px);
  font-family: "SCRegular";
  margin-bottom: min(2.5vw, 10px);
}
#stockTableTitle {
  text-align: center;
}
#stockTable {
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