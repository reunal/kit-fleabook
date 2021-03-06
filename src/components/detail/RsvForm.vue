<template>
  <div>
    <div id="formWrap">
      <v-text-field
        v-model="studentId"
        label="학번 입력"
        hide-details="auto"
        :disabled="isRsvDisable"
        :rules="[rules.sIdReq]"
      ></v-text-field>
      <div style="width: min(2vw, 14px)"></div>
      <v-text-field
        v-model="name"
        label="이름 입력"
        hide-details="auto"
        :disabled="isRsvDisable"
      ></v-text-field>
    </div>
    <v-text-field
      v-model="password"
      label="예약 비밀번호 입력"
      hint="적어도 4자리 이상 입력해주세요"
      @click:append="isDisplayPasswd = !isDisplayPasswd"
      :append-icon="isDisplayPasswd ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.passwdReq, rules.passwdMin]"
      :type="isDisplayPasswd ? 'text' : 'password'"
      :disabled="isRsvDisable"
    ></v-text-field>
    <p id="passwdWarningText">
      비밀번호에 한글, 영어가 모두 들어갈 수 있으니 비밀번호를 잘 확인해주세요!
    </p>
    <div id="alert">
      <v-alert v-model="alert" dense type="error" dark dismissible>
        {{ alertMessage }}
      </v-alert>
    </div>
    <div id="rsvBtnDiv">
      <v-btn elevation="0" @click="addRsv" :disabled="isRsvDisable" outlined>
        예약하기
      </v-btn>
    </div>
  </div>
</template>

<script>
import { addBookRsv } from "../../api/index";
export default {
  name: "RsvForm",
  props: ["reqInfo"],
  data: function () {
    this.reqInfo.rules = {
      sIdReq: () => this.sIdRule() || "학번을 제대로 입력해주세요",
      passwdReq: () => this.passwdRule()[0] || "비밀번호를 입력해주세요.",
      passwdMin: () => this.passwdRule()[1] || "적어도 4자리 이상 입력해주세요",
    };
    return this.reqInfo;
  },
  methods: {
    //예약버튼
    addRsv: function () {
      this.todayInfo = new Date();
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
      } else if (!this.date || !this.hour || !this.minute) {
        this.alert = true;
        this.alertMessage = "날짜와 시간을 입력했는지 확인해주세요!";
      } else if (
        new Date(this.date + " " + this.hour + ":" + this.minute) <
        this.todayInfo
      ) {
        this.alert = true;
        this.alertMessage =
          "입력한 날짜와 시간이 현재 시각보다 이전입니다. 다시 확인해주세요!";
      } else {
        this.alert = false;
        this.alertMessage = "";
        this.processRsv = true;
        const data = {
          title: this.bookTitle,
          password: this.password,
          studentId: this.studentId,
          name: this.name,
          time: this.hour + ":" + this.minute,
          date: this.date,
        };
        this.processRsv = false;
        this.isRsvSuccess = true;
        this.rsvResultTitle = "예약 성공";
        this.rsvResultText = "예약이 성공적으로 진행되었습니다!";
        addBookRsv({ bookId: this.bookId, data })
          .then((Response) => {
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
            } else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
              this.rsvResultTitle = "예약 실패";
              this.rsvResultText =
                "오류 발생 후 오류 처리 중 문제가 발생했습니다.";
            }
          });
      }
    },
    //각종 rule 함수
    sIdRule: function () {
      return this.studentId.length === 8 && this.isStudentId();
    },
    passwdRule: function () {
      return [this.password != 0, this.password.length >= 4];
    },
    isStudentId: function () {
      var re = new RegExp("^[0-9]+$");
      return re.test(this.studentId);
    },
  },
};
</script>

<style scoped>
#formWrap {
  display: flex;
  margin-bottom: min(4vw, 28px);
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
  text-align: center;
  margin-top: min(1.5vw, 6px);
}
#passwdWarningText {
  margin: 0;
  font-size: min(3vw, 12px);
  color: #d97a7c;
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
