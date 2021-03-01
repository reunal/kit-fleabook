<template>
  <div id="bookInfoWrap">
    <div id="bookInfo">
      <div style="width: min(90vw, 360px)"></div>
      <div>
        <div id="titleDiv">
          <span id="title">{{ bookTitle }}</span>
          <span id="available">{{ isRsv }}</span>
        </div>
        <v-chip color="gray" label small id="writer" class="chips">
          <v-icon left> mdi-label </v-icon>
          저자 : {{ bookWriter }}
        </v-chip>
        <v-chip color="gray" label small id="publisher" class="chips">
          <v-icon left> mdi-label </v-icon>
          출판사 : {{ bookPublisher }}
        </v-chip>
      </div>
      <v-divider id="divider"></v-divider>
      <div id="stockTitle">
        <p>재고 리스트</p>
        <p id="stockCnt">(예약 가능 권수 : {{ stockCnt - rsvCnt }})</p>
      </div>
      <div id="stockTableDiv" v-if="isExistStock">
        <stock-list :stockList="stockList"> </stock-list>
      </div>
      <v-divider id="divider"></v-divider>
      <div id="stockTitle">
        <p>예약하기</p>
      </div>
      <div data-app :disabled="isRsvDisable">
        <date-picker
          @getDate="getDate"
          :isRsvDisable="isRsvDisable"
        ></date-picker>
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
        <time-picker
          :isRsvDisable="isRsvDisable"
          @getTime="getTime"
        ></time-picker>
        <v-text-field
          v-model="studentId"
          label="학번 입력"
          hide-details="auto"
          :disabled="isRsvDisable"
          :rules="[rules.sIdReq]"
        ></v-text-field>
        <v-text-field
          v-model="name"
          label="이름 입력"
          hide-details="auto"
          :disabled="isRsvDisable"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="예약 비밀번호 입력"
          hint="적어도 8자리 이상 입력해주세요"
          @click:append="isDisplayPasswd = !isDisplayPasswd"
          :append-icon="isDisplayPasswd ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.passwdReq, rules.passwdMin]"
          :type="isDisplayPasswd ? 'text' : 'password'"
          :disabled="isRsvDisable"
        ></v-text-field>
      </div>
      <v-alert v-model="alert" dense type="error" dark dismissible id="alert">
        {{ alertMessage }}
      </v-alert>
      <div id="rsvBtnDiv">
        <v-btn elevation="2" @click="addRsv" :disabled="isRsvDisable">
          예약하기
        </v-btn>
      </div>
      <v-dialog v-model="processRsv" max-width="290">
        <v-card>
          <v-card-title class="headline"> 예약 진행 중 </v-card-title>

          <v-card-text>
            서버의 응답을 기다리고 있습니다<v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="isRsvSuccess" max-width="290">
        <v-card>
          <v-card-title class="headline">
            {{ rsvResultTitle }}
          </v-card-title>

          <v-card-text>
            {{ rsvResultText }}
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
  
<script>
//라이브러리 추가
import { addBookRsv, getBookStock, getBookRsv } from "../api/index";
import StockList from "../components/detail/StockList.vue";
import DatePicker from "../components/DatePicker.vue";
import TimePicker from "../components/TimePicker.vue";

//BookDetail.vue 컴포넌트 관리
export default {
  name: "BookDetails",
  components: {
    StockList,
    DatePicker,
    TimePicker,
  },
  //컴포넌트가 사용하는 변수 정의 및 초기화(비동기 사용 불가능)
  data: function () {
    return {
      //책 정보 변수
      bookTitle: "로딩 중",
      bookWriter: "로딩 중",
      bookPublisher: "로딩 중",
      bookId: null,
      //예약 가능한 지
      isRsv: "로딩 중",
      //재고 변수
      stockList: [],
      stockCnt: 0,
      rsvList: [],
      rsvRawList: [],
      rsvCnt: 0,
      isExistStock: true,
      isRsvDisable: false,
      //예약 관련 변수
      date: null,
      time: null,
      name: null,
      isClickedDate: false,
      isDisplayPasswd: false,
      studentId: "",
      password: "",
      alert: false,
      alertMessage: "",
      //예약 진행/성공/실패 메시지
      processRsv: false,
      rsvResultTitle: "",
      rsvResultText: "",
      isRsvSuccess: false,
      //input 요소 관련 규칙 설정
      rules: {
        sIdReq: () => this.sIdRule() || "학번을 제대로 입력해주세요",
        passwdReq: () => this.passwdRule()[0] || "비밀번호를 입력해주세요.",
        passwdMin: () =>
          this.passwdRule()[1] || "적어도 8자리 이상 입력해주세요",
      },
    };
  },
  //컴포넌트가 사용하는 메소드 정의
  methods: {
    //예약버튼
    addRsv: function () {
      if (
        !(
          this.sIdRule() &&
          this.passwdRule()[0] &&
          this.passwdRule()[1] &&
          !!this.name
        )
      ) {
        this.alert = true;
        this.alertMessage = "올바른 사용자 정보를 입력해주세요!";
      } else if (!this.date || !this.time) {
        this.alert = true;
        this.alertMessage = "날짜와 시간을 입력했는지 확인해주세요!";
      } else if (this.rsvList.includes(this.time)) {
        this.alert = true;
        this.alertMessage = "날짜와 시간이 중복되지 않는 지 확인해주세요!";
      } else {
        this.alert = false;
        this.alertMessage = "";
        this.processRsv = true;
        let timestamp = this.date + "-" + this.time.replace(":", "-");
        let data = {
          title: this.bookTitle,
          password: this.password,
          studentId: this.studentId,
          time: timestamp,
          date: timestamp,
        };
        addBookRsv({ bookId: this.bookid, data })
          .then((Response) => {
            console.log(Response);
            if (Response.status == 201) {
              this.processRsv = false;
              this.isRsvSuccess = true;
              this.rsvResultTitle = "예약 성공";
              this.rsvResultText = "예약이 성공적으로 진행되었습니다!";
            }
          })
          .catch((error) => {
            this.processRsv = false;
            this.isRsvSuccess = true;
            if (error.response) {
              // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
              this.rsvResultTitle = "예약 실패";
              this.rsvResultText =
                "오류 내용 : (" +
                error.response.status +
                ") " +
                error.response.data;
            } else if (error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
              // Node.js의 http.ClientRequest 인스턴스입니다.
              this.rsvResultTitle = "예약 실패";
              this.rsvResultText = "서버로 부터 응답을 받지 못했습니다.";
              console.log(error.request);
            } else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
              this.rsvResultTitle = "예약 실패";
              this.rsvResultText =
                "오류 발생 후 오류 처리 중 문제가 발생했습니다.";
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
      }
    },
    //자식에게 데이터를 받아오는 함수
    getDate: function (date) {
      this.rsvList.splice(0, this.rsvList.length);
      this.date = date;
      this.setRsvList();
    },
    getTime: function (time) {
      this.time = time;
    },

    //각종 rule 함수
    sIdRule: function () {
      return this.studentId.length == 8 && this.isStudentId();
    },
    passwdRule: function () {
      return [this.password != 0, this.password.length >= 8];
    },
    isStudentId: function () {
      var re = new RegExp("^[0-9]+$");
      return re.test(this.studentId);
    },

    //api 책 정보 받아오기
    getBookInfo: function () {
      const { book } = this.$route.query;
      console.log(book);
      this.bookId = book.id;
      this.bookTitle = book.title;
      this.bookWriter = book.auther;
      this.bookPublisher = book.publisher;
      this.stockCnt = book.stockCount;
      this.rsvCnt = book.reservationCount;
      if (this.stockCnt == this.rsvCnt) {
        this.isRsv = "예약 불가능";
        this.isRsvDisable = true;
      } else {
        this.isRsv = "예약 가능";
      }
      getBookStock({ bookId: this.bookId })
        .then((res) => {
          console.log(res);
          this.stockList = res.data;
          if (this.stockList.length === 0) {
            this.isRsv = "매물 없음";
            this.isExistStock = false;
            this.isRsvDisable = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      getBookRsv({ bookId: this.bookId })
        .then((res) => {
          this.rsvRawList = res.data;
          console.log(this.rsvRawList);
        })
        .catch((Error) => {
          console.log(Error);
        });
    },
    setRsvList: function () {
      var re = new RegExp("[0-9]+-[0-9]+-[0-9]+-");
      for (let i = 0; i < this.rsvRawList.length; i++) {
        if (this.rsvRawList[i].time.includes(this.date)) {
          let time_text = this.rsvRawList[i].time
            .replace(re, "")
            .replace("-", ":");
          if (time_text.length == 2) {
            time_text += ":00";
          }
          this.rsvList.push(time_text);
        }
      }
    },
  },
  //DOM을 업데이트 해서 view refresh하는 부분(비동기 사용 가능)
  mounted: function () {
    this.getBookInfo();
  },
};
</script>

<style scoped>
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

#bookInfoWrap {
  display: flex;
  justify-content: center;
}
#bookInfo {
  max-width: 400px;
  padding: min(5vw, 20px);
  font-family: "SCRegular";
}
#titleDiv {
  margin-bottom: min(5vw, 20px);
}
#title,
#available {
  display: inline-flex;
}
#title {
  font-family: "SCBold";
  font-size: min(10vw, 40px);
  margin-right: min(1vw, 4px);
}
#available {
  font-size: min(4vw, 16px);
}
#writer,
#publisher {
  font-size: min(3vw, 12px);
  height: min(5vw, 20px);
}
#writer {
  margin-right: min(1vw, 4px);
}
#divider {
  margin-top: min(2.5vw, 10px);
  margin-bottom: min(3vw, 12px);
}
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
#timeList {
  text-align: center;
}
#rsvBtnDiv {
  margin-top: min(2vw, 8px);
  margin-bottom: min(8vw, 32px);
  text-align: right;
}
#alert {
  margin-top: min(1.5vw, 6px);
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
.v-application p {
  margin-bottom: 0;
}
</style>
