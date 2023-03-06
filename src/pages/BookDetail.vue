<template>
  <v-container>
    <v-card elevation="2">
      <loading-dialog v-if="loading" />
      <div v-if="!loading">
        <book-info :bookInfo="bookInfo" />
        <v-divider />

        <stock-list :stockInfo="stockInfo"> </stock-list>
        <v-divider />

        <help-area />
        <v-divider />

        <rsv-wrap :rsvInfo="rsvInfo" />
      </div>
    </v-card>
  </v-container>
</template>

<script>
//라이브러리 추가
import { getBookInfo, getBookStock, getBookRsv } from "../api/index";
import BookInfo from "../components/detail/BookInfo.vue";
import StockList from "../components/detail/StockList.vue";
import HelpArea from "../components/detail/HelpArea.vue";
import RsvWrap from "../components/detail/RsvWrap.vue";
import LoadingDialog from "../components/detail/LoadingDialog.vue";
//BookDetail.vue 컴포넌트 관리
export default {
  name: "BookDetails",
  components: {
    BookInfo,
    StockList,
    RsvWrap,
    LoadingDialog,
    HelpArea,
  },
  //컴포넌트가 사용하는 변수 정의 및 초기화(비동기 사용 불가능)
  data: function() {
    return {
      //책 정보 변수
      bookId: null,
      loading: false,
      bookInfo: {
        bookTitle: "로딩 중",
        bookWriter: "로딩 중",
        bookPublisher: "로딩 중",
        isRsv: "로딩 중",
      },
      //재고 변수
      stockInfo: {
        stockList: [],
        stockCnt: 0,
        stockCntA: 0,
        stockCntB: 0,
        stockCntC: 0,
        rsvCnt: 0,
        rsvCntA: 0,
        rsvCntB: 0,
        rsvCntC: 0,
        isExistStock: true,
        showStateInfoDialog: false,
      },
      //예약 관련 변수
      rsvInfo: {
        bookTitle: null,
        bookId: null,
        //렌더링 요소 관련
        dateMenu: false,
        date: null,
        dates: [],
        hour: null,
        hours: [],
        minute: null,
        minutes: [],
        rsvRawList: [],
        rsvList: [],
        // 상태 추가
        status: null,
        statusArr: [],
        todayInfo: null,
        isHourDisable: false,
        isMinuteDisable: false,
        //입력 받을 데이터들
        studentId: "",
        name: "",
        password: "",
        isDisplayPasswd: false,
        //예약 진행/성공/실패 메시지
        processRsv: false,
        rsvResultTitle: "",
        rsvResultText: "",
        isRsvSuccess: false,
        //규칙 및 경고문
        alert: false,
        isRsvDisable: false,
        alertMessage: "",
        rules: null,
      },
    };
  },
  //컴포넌트가 사용하는 메소드 정의
  methods: {
    //api 책 정보 받아오기
    getBook: function() {
      this.loading = true;
      this.bookId = this.$route.query.bookId;
      this.rsvInfo.bookId = this.bookId;
      getBookInfo({ bookId: this.bookId })
        .then((res) => {
          const { data } = res;
          console.log(res);
          this.bookInfo.bookTitle = data.title;
          this.rsvInfo.bookTitle = data.title;
          this.bookInfo.bookWriter = data.author;
          this.bookInfo.bookPublisher = data.publisher;
          this.stockInfo.stockCnt =
            data.stockCountA + data.stockCountB + data.stockCountC;
          this.stockInfo.stockCntA = data.stockCountA;
          this.stockInfo.stockCntB = data.stockCountB;
          this.stockInfo.stockCntC = data.stockCountC;
          this.stockInfo.rsvCnt =
            data.reservationCountA +
            data.reservationCountB +
            data.reservationCountC;
          this.stockInfo.rsvCntA = data.reservationCountA;
          this.stockInfo.rsvCntB = data.reservationCountB;
          this.stockInfo.rsvCntC = data.reservationCountC;
          getBookStock({ bookId: this.bookId })
            .then((res) => {
              this.stockInfo.stockList = res.data;
              this.setValues();
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
            });
          getBookRsv({ bookId: this.bookId })
            .then((res) => {
              this.rsvInfo.rsvRawList = res.data;
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
            });
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    setValues() {
      if (this.stockInfo.stockCnt == this.stockInfo.rsvCnt) {
        this.bookInfo.isRsv = "예약 불가능";
        this.rsvInfo.isRsvDisable = true;
      } else {
        this.bookInfo.isRsv = "예약 가능";
      }
      if (this.stockInfo.stockList.length === 0) {
        this.bookInfo.isRsv = "매물 없음";
        this.stockInfo.isExistStock = false;
        this.rsvInfo.isRsvDisable = true;
      }
      //지정된 시간 이전에는 예약 버튼 클릭 불가능하게 막아놓기
      this.todayInfo = new Date();
      const startDate = new Date(2023, 3, 9, 0, 0, 0);

      if (this.todayInfo < startDate) {
        this.rsvInfo.isRsvDisable = true;
      }
    },
  },
  //DOM을 업데이트 해서 view refresh하는 부분(비동기 사용 가능)
  mounted: function() {
    this.getBook();
  },
};
</script>

<style lang="scss" scoped>
/*웹 폰트 불러오기*/
@font-face {
  font-family: "SCRegular";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "SCMedium";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "SCBold";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.container {
  padding: min(5vw, 20px);

  & > * {
    margin: auto;
  }
}

.v-card {
  max-width: 700px;
  min-height: 899px;
  padding: min(5vw, 20px);
  font-family: "SCRegular";
  background-color: white;
}

.v-divider {
  margin-top: min(2.5vw, 10px);
  margin-bottom: min(3vw, 12px);
}

.v-application p {
  margin-bottom: 0;
}
</style>
