<template>
  <v-app-bar app color="white" flat>
    <v-tabs centered color="grey darken-1" v-model="active">
      <v-tab>금오공대</v-tab>
      <v-tab name="home" @click="goUrl('/')">책 보기</v-tab>
      <v-tab name="reserve" @click="goUrl('/reserve')">예약조회</v-tab>
      <v-tab name="about" @click="goUrl('/about')">About us</v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>
const getUrlKey = (url) => {
  switch (url) {
    case "/":
      return 1;
    case "/reserve":
      return 2;
    case "/about":
      return 3;
  }
};
export default {
  data: () => ({
    active: getUrlKey(window.location.pathname),
  }),
  methods: {
    goUrl(url) {
      const router = this.$router;
      // 새로고침 -> 데이터 리랜더링 으로 변경예정
      url === this.$route.path ? router.go() : router.push(url);
    },
  },
};
</script>

<style>
</style>