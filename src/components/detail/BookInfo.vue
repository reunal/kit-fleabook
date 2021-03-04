<template>
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
</template>

<script>
export default {
  name: "BookInfo",
  props: ["bookInfo"],
  data() {
    return this.bookInfo;
  },
};
</script>

<style scoped>
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
</style>