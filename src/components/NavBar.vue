<template>
  <v-app-bar app color="white" flat>
    <v-tabs centered color="grey darken-1">
      <v-tab to="/about" dark> 금오공대</v-tab>
      <v-tab to="/">책 보기</v-tab>
      <v-tab to="/reserve">예약조회</v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
.v-tabs
  border-bottom: 1px solid rgba(0,0,0,0.2)
</style>