<template>
  <div>
    <div id="titleDiv">
      <span id="title">{{ bookTitle }}</span>
      <span id="available">{{ isRsv }}</span>
    </div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-chip
          color="gray"
          small
          label
          id="writer"
          class="chips"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left> mdi-label </v-icon>
          <div id="writerDiv">저자 : {{ bookWriter }}</div>
        </v-chip>
      </template>
      <span id="writerTooltip">{{ bookWriter }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-chip
          color="gray"
          small
          label
          id="publisher"
          class="chips"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left> mdi-label </v-icon>

          <div id="publisherDiv">출판사 : {{ bookPublisher }}</div>
        </v-chip>
      </template>
      <span id="publisherTooltip">{{ bookPublisher }}</span>
    </v-tooltip>
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
#writerTooltip,
#publisherTooltip {
  word-break: break-all;
}
#writerDiv,
#publisherDiv {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>