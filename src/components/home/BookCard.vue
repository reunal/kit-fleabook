<template>
  <v-card class="mx-auto" max-width="700" outlined>
    <v-list-item three-line>
      <v-list-item-avatar tile size="100" color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1"> 책 이름 </v-list-item-title>
        <v-list-item-subtitle>책 출반사. 책 저자</v-list-item-subtitle>

        <v-list-item-content>
          <v-list-item-subtitle>총 {{5}}권 중 {{3}}권 예약 가능</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>