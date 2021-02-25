<template>
  <v-card>
    <v-container>
      <v-card-title>
        {{ item.title }}
      </v-card-title>

      <v-container class="inputs">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              readonly
              v-model="date"
              label="예약 날짜"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            locale="ko"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
        <v-row>
          <v-col clos="12" md="4">
            예약 시간
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-card-actions>
      <div class="bts">
      <v-btn @click="close()">수정</v-btn>
      <v-btn @click="close()">예약 취소</v-btn>
      <v-btn @click="close()" class="mxauto">닫기</v-btn>
      </div>
    </v-card-actions>
    <v-card-subtitle class="text-center"> 예약 취소는 되돌릴 수 없습니다. </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: ["item"],
  data: () => ({
    menu: false,
    date: new Date().toISOString().substr(0, 10),
  }),
  methods: {
    close() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.inputs {
  max-width: 500px;
}
.bts{
  margin: auto;
  & > .v-btn{
    margin-left: 4px
  }
}
</style>