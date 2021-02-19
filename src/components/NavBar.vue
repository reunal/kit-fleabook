<template>
  <v-app-bar app color="white" flat>
    <v-tabs centered color="grey darken-1">
        <v-tab @click="goUrl('/')">책 보기</v-tab>
        <v-tab @click="goUrl('/reserve')">예약조회</v-tab>
        <v-tab @click="goUrl('/about')">About us</v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
      
  }),
  methods: {
    goUrl(url) {
      if (url === this.$route.path) this.$router.go();
      else this.$router.push(url);
    },
  },
};
</script>

<style>
</style>